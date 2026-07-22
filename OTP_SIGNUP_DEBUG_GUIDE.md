# OTP Signup Flow - Debugging Guide

**Updated**: 2026-07-22

---

## Overview

The OTP signup flow in OnePG has two steps:
1. **Step 1**: User enters details (name, company, email, password) → Request OTP → OTP sent to email
2. **Step 2**: User enters 4-digit OTP → Verify → Account created

---

## Backend Flow

### 1. Send OTP Request
**Endpoint**: `POST /api/auth/send-signup-otp`

**Request**:
```json
{
  "email": "merchant@company.com",
  "name": "John Doe"
}
```

**Backend Processing**:
1. Validates email format
2. Checks if email already registered
3. Generates random 4-digit OTP (1000-9999)
4. Stores OTP in memory: `signupOtpStore.set(normalizedEmail, { otp, expiresAt })`
5. Sends OTP via email using AWS SES
6. **Console Log**: `[OTP] Generated for {email}: {otp} (expires in 10 min)`

**Response**:
```json
{
  "success": true,
  "message": "Verification code sent to your email address."
}
```

### 2. Verify OTP & Signup
**Endpoint**: `POST /api/auth/signup`

**Request**:
```json
{
  "name": "John Doe",
  "company": "Acme Tech",
  "email": "merchant@company.com",
  "password": "SecurePass123",
  "phone": "+91 98765 43210",
  "otp": "1234"
}
```

**Backend Processing**:
1. Validates required fields (name, email, password)
2. Checks email not already registered
3. Retrieves OTP from memory store
4. **Console Logs**:
   - `[OTP] Verifying {email}: stored={bool}, provided={otp}, match={bool}, expired={bool}`
   - Returns specific error if any check fails
5. If valid:
   - Clears OTP from store
   - Hashes password with bcrypt
   - Creates user in database
   - Issues JWT token
   - **Console Log**: `[OTP] Successfully verified {email}`

**Possible Errors**:
- ❌ "Email already registered" - Email already has an account
- ❌ "Verification code not found. Please request a new one." - OTP expired or not requested
- ❌ "Verification code has expired. Please request a new one." - OTP older than 10 minutes
- ❌ "Invalid verification code. Please check and try again." - Wrong OTP digits

**Success Response**:
```json
{
  "success": true,
  "message": "Account registered successfully!",
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "merchant@company.com",
    "role": "client"
  }
}
```

---

## Debugging with Browser Console

### Check Frontend Logs

Open DevTools (F12) → Console tab:

```javascript
// You should see logs like:
[OTP] Requesting OTP for: merchant@company.com
[OTP] Successfully sent OTP

// Then on step 2:
[OTP] Verifying OTP: 1234 for email: merchant@company.com
[OTP] Signup successful, redirecting...
```

### Check Backend Logs

SSH into server and check logs:

```bash
# Monitor live logs
tail -f /var/log/pm2/server-error.log

# Or grep for OTP logs
grep "\[OTP\]" /var/log/pm2/server-error.log
```

**Expected backend logs**:
```
[OTP] Generated for merchant@company.com: 5678 (expires in 10 min)
[OTP] Verifying merchant@company.com: stored=true, provided=5678, match=true, expired=false
[OTP] Successfully verified merchant@company.com
```

---

## Common Issues & Solutions

### Issue 1: "Email already registered"

**Symptoms**:
- Step 1 works fine, OTP sent
- Step 2 returns "Email already registered"

**Causes**:
- Someone else already created account with this email
- Previous signup attempt failed but email was already saved

**Solution**:
```bash
# Check database
psql -U postgres -d onepg -c "SELECT id, email, created_at FROM users WHERE email='merchant@company.com';"

# If duplicate exists, delete it (if safe):
psql -U postgres -d onepg -c "DELETE FROM users WHERE email='merchant@company.com' AND id != 'keep-this-id';"
```

---

### Issue 2: "Verification code not found" or "Verification code has expired"

**Symptoms**:
- Step 1: OTP sent ✓
- Step 2: Says code is expired/not found

**Causes**:
1. More than 10 minutes passed between requesting and verifying OTP
2. Backend restarted (OTP stored in memory, lost on restart)
3. OTP requested for email, but verifying with different email (case sensitivity)

**Solution**:
- Request new OTP if > 10 minutes
- Don't restart backend during OTP verification
- Ensure email case is consistent (test uses lowercase)

**Debug**:
```bash
# Check backend logs for specific issue
grep "\[OTP\] Verifying" /var/log/pm2/server-error.log | tail -5
```

---

### Issue 3: "Invalid verification code"

**Symptoms**:
- Frontend says OTP verified ✓
- Backend says OTP is invalid

**Causes**:
1. User entered wrong OTP digits
2. Email normalization mismatch (spaces, case)
3. Frontend not sending OTP properly

**Solution**:
- Check frontend console: `[OTP] Verifying OTP: {otp} for email: {email}`
- Verify OTP matches email in backend logs
- Ensure email has no extra spaces

---

### Issue 4: Browser Network Error

**Symptoms**:
- "Network connection error. Server might be offline."

**Causes**:
- Backend server down
- Network blocked
- CORS issue

**Debug**:
```javascript
// In browser console:
fetch('https://your-api.com/api/health')
  .then(r => r.json())
  .then(d => console.log('Backend OK:', d))
  .catch(e => console.error('Backend DOWN:', e));
```

---

## Email Service Issues

If OTP is generated but email not received:

### Check Email Configuration

**File**: [server/src/utils/mailer.js](server/src/utils/mailer.js)

```bash
# Check AWS SES credentials
env | grep -i aws
env | grep -i ses
env | grep -i email
```

### Test Email Sending

```bash
# SSH to server and test
curl -X POST http://localhost:5000/api/auth/send-signup-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User"
  }'

# Check logs for:
# - [OTP] Generated...
# - Any email sending errors
```

---

## Production Deployment Notes

### Important: OTP Storage

⚠️ **Current Implementation**: OTP stored in-memory (in process memory)

**Risks**:
- Lost on server restart
- Not shared across multiple server instances (if load balanced)

**Recommendations** for production:
```javascript
// Option 1: Use Redis instead of Map
import redis from 'redis';
const redisClient = redis.createClient();

// Store OTP in Redis (persists across restarts)
await redisClient.setex(normalizedEmail, 600, JSON.stringify({ otp, expiresAt }));
const otpData = await redisClient.get(normalizedEmail);

// Option 2: Use database
// Add otp_store table with expiry
CREATE TABLE otp_store (
  email VARCHAR(255) PRIMARY KEY,
  otp VARCHAR(4) NOT NULL,
  expires_at BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Rate Limiting

Consider adding rate limiting to prevent OTP spam:

```javascript
// Limit OTP requests to 3 per hour per email
const otpAttempts = new Map();

router.post("/send-signup-otp", (req, res, next) => {
  const { email } = req.body;
  const key = email.toLowerCase();
  const attempts = otpAttempts.get(key) || [];
  const recentAttempts = attempts.filter(t => Date.now() - t < 3600000);
  
  if (recentAttempts.length >= 3) {
    return res.status(429).json({ 
      success: false, 
      message: "Too many OTP requests. Try again in 1 hour." 
    });
  }
  
  recentAttempts.push(Date.now());
  otpAttempts.set(key, recentAttempts);
  next();
});
```

---

## Testing Checklist

- [ ] Request OTP with valid email → Receives "Verification code sent"
- [ ] Check email inbox → Receives OTP code
- [ ] Enter 4-digit OTP correctly → Account created ✓
- [ ] Enter wrong OTP → "Invalid verification code" error
- [ ] Wait 10+ minutes → Request new OTP → Works ✓
- [ ] Use already-registered email → "Email already registered" error
- [ ] Browser console shows `[OTP]` logs with email/otp codes
- [ ] Backend logs show matching OTP verification logs
- [ ] After successful signup → Redirects to `/dashboard`
- [ ] Token saved to localStorage

---

## Quick Test Script

```javascript
// Run in browser console on signup page

// Step 1: Request OTP
const email = 'test' + Date.now() + '@onepg.co.in';
const name = 'Test Merchant';

const step1 = await fetch('/api/auth/send-signup-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, name })
}).then(r => r.json());

console.log('Step 1:', step1);

// Note: Check email for OTP code
// Then fill OTP in form manually

// Step 2: Verify OTP (after you get code from email)
const otp = '1234'; // Replace with actual OTP from email
const password = 'TestPass123';

const step2 = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name,
    company: 'Test Company',
    email,
    password,
    phone: '+91 98765 43210',
    otp
  })
}).then(r => r.json());

console.log('Step 2:', step2);
```

---

## Need More Help?

Check server logs:
```bash
ssh user@200.97.174.138
tail -f /var/log/pm2/server-error.log | grep "OTP\|signup\|error"
```

Or check database:
```bash
psql -U postgres -d onepg -c "SELECT * FROM users ORDER BY created_at DESC LIMIT 5;"
```
