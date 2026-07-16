-- ============================================================
-- OnePG Payments Onboarding Portal — Database Schema
-- ============================================================

-- 1. CLIENTS TABLE
CREATE TABLE IF NOT EXISTS clients (
  id             VARCHAR(50) PRIMARY KEY, -- e.g. 'OPG-2026-1045'
  name           VARCHAR(100) NOT NULL,
  company        VARCHAR(150) NOT NULL,
  email          VARCHAR(150) NOT NULL UNIQUE,
  phone          VARCHAR(30),
  plan           VARCHAR(50) NOT NULL DEFAULT 'Basic' CHECK (plan IN ('Basic', 'Premium')),
  status         VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Under Review', 'Completed')),
  progress       INT NOT NULL DEFAULT 10,
  amount_paid    NUMERIC(12,2) NOT NULL DEFAULT 0,
  pending_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  webhook_url    VARCHAR(255) DEFAULT NULL,
  client_secret  VARCHAR(255) DEFAULT NULL,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(50) NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'client')),
  client_id     VARCHAR(50) DEFAULT NULL,
  is_active     SMALLINT NOT NULL DEFAULT 1,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
);

-- 3. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
  id         SERIAL PRIMARY KEY,
  client_id  VARCHAR(50) NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name       VARCHAR(100) NOT NULL,
  status     VARCHAR(50) NOT NULL DEFAULT 'Not Started' CHECK (status IN ('Not Started', 'In Progress', 'Pending', 'Under Review', 'Applied', 'Approved', 'Active', 'Completed')),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (client_id, name)
);

-- 4. TIMELINE TABLE
CREATE TABLE IF NOT EXISTS timeline (
  id         SERIAL PRIMARY KEY,
  client_id  VARCHAR(50) NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  label      VARCHAR(255) NOT NULL,
  date       VARCHAR(50) NOT NULL,
  notes      TEXT DEFAULT NULL,
  status     VARCHAR(50) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. INVOICES TABLE
CREATE TABLE IF NOT EXISTS invoices (
  id         VARCHAR(50) PRIMARY KEY, -- e.g. 'INV-2026-0091'
  client_id  VARCHAR(50) NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  date       VARCHAR(50) NOT NULL,
  amount     NUMERIC(12,2) NOT NULL,
  status     VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Paid')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS documents (
  id         SERIAL PRIMARY KEY,
  client_id  VARCHAR(50) NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name       VARCHAR(150) NOT NULL,
  status     VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Uploaded', 'Under Review', 'Approved', 'Rejected')),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (client_id, name)
);

-- 7. TICKETS TABLE
CREATE TABLE IF NOT EXISTS tickets (
  id          VARCHAR(50) PRIMARY KEY, -- e.g. 'TCK-2026-9281'
  client_id   VARCHAR(50) NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  title       VARCHAR(255) NOT NULL,
  status      VARCHAR(50) NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'Resolved')),
  date        VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  severity    VARCHAR(50) NOT NULL CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── SEED DATA INSERTS ──────────────────────────────────────────

-- Seed Clients
INSERT INTO clients (id, name, company, email, phone, plan, status, progress, amount_paid, pending_amount)
VALUES (
  'OPG-2026-1045', 
  'Rahul Sharma', 
  'Sharma Enterprises', 
  'rahul@sharmaent.com', 
  '+91 98765 43210', 
  'Premium', 
  'In Progress', 
  65, 
  20000.00, 
  10000.00
) ON CONFLICT (id) DO NOTHING;

INSERT INTO clients (id, name, company, email, phone, plan, status, progress, amount_paid, pending_amount)
VALUES (
  'OPG-2026-1042', 
  'Anjali Verma', 
  'Verma Tech Solutions', 
  'anjali@vermatech.com', 
  '+91 98765 43211', 
  'Basic', 
  'In Progress', 
  40, 
  10000.00, 
  0.00
) ON CONFLICT (id) DO NOTHING;

INSERT INTO clients (id, name, company, email, phone, plan, status, progress, amount_paid, pending_amount)
VALUES (
  'OPG-2026-1043', 
  'Vikram Singh', 
  'Singh Logistics', 
  'vikram@singhlogistics.com', 
  '+91 98765 43212', 
  'Premium', 
  'Completed', 
  100, 
  30000.00, 
  0.00
) ON CONFLICT (id) DO NOTHING;

INSERT INTO clients (id, name, company, email, phone, plan, status, progress, amount_paid, pending_amount)
VALUES (
  'OPG-2026-1044', 
  'Neha Gupta', 
  'Gupta FinTech', 
  'neha@guptafintech.com', 
  '+91 98765 43213', 
  'Premium', 
  'Under Review', 
  20, 
  5000.00, 
  25000.00
) ON CONFLICT (id) DO NOTHING;

-- Seed Services
INSERT INTO services (client_id, name, status) VALUES 
('OPG-2026-1045', 'Payout Process', 'Active'),
('OPG-2026-1045', 'Payin Settlement', 'In Progress'),
('OPG-2026-1045', 'Advocate AI Integration', 'Applied'),
('OPG-2026-1045', 'Custom CRM Access', 'Pending'),
('OPG-2026-1042', 'Payout Process', 'In Progress'),
('OPG-2026-1042', 'Payin Settlement', 'Not Started'),
('OPG-2026-1043', 'Payout Process', 'Active'),
('OPG-2026-1043', 'Payin Settlement', 'Active'),
('OPG-2026-1043', 'Advocate AI Integration', 'Active'),
('OPG-2026-1044', 'Payout Process', 'Under Review'),
('OPG-2026-1044', 'Payin Settlement', 'Not Started')
ON CONFLICT (client_id, name) DO NOTHING;

-- Seed Documents
INSERT INTO documents (client_id, name, status) VALUES
('OPG-2026-1045', 'Certificate of Incorporation', 'Uploaded'),
('OPG-2026-1045', 'Company PAN Card', 'Uploaded'),
('OPG-2026-1045', 'Corporate GST Certificate', 'Uploaded'),
('OPG-2026-1045', 'Technical Compliance Signoff', 'Under Review'),
('OPG-2026-1042', 'Certificate of Incorporation', 'Uploaded'),
('OPG-2026-1042', 'Company PAN Card', 'Uploaded'),
('OPG-2026-1042', 'Corporate GST Certificate', 'Uploaded'),
('OPG-2026-1043', 'Certificate of Incorporation', 'Uploaded'),
('OPG-2026-1043', 'Company PAN Card', 'Uploaded'),
('OPG-2026-1043', 'Corporate GST Certificate', 'Uploaded')
ON CONFLICT (client_id, name) DO NOTHING;

-- Seed Timeline
INSERT INTO timeline (client_id, label, date, notes, status) VALUES
('OPG-2026-1045', 'KYC Document approved', '12 July 2026', 'KYC Document approved by compliance officer.', 'Completed'),
('OPG-2026-1045', 'Services setup initiated', '10 July 2026', 'Services setup initiated. ICICI Routing Node configured.', 'In Progress'),
('OPG-2026-1045', 'Corporate onboarding complete', '08 July 2026', 'Corporate account onboarding registration completed.', 'Completed'),
('OPG-2026-1042', 'GST Verification', '11 July 2026', 'Company GST verified.', 'Completed'),
('OPG-2026-1043', 'Services active', '13 July 2026', 'All services configured and active.', 'Completed');

-- Seed Invoices
INSERT INTO invoices (id, client_id, date, amount, status) VALUES
('INV-2026-0091', 'OPG-2026-1045', '08 July 2026', 20000.00, 'Paid'),
('INV-2026-0092', 'OPG-2026-1045', '--', 10000.00, 'Pending'),
('INV-2026-0095', 'OPG-2026-1042', '08 July 2026', 10000.00, 'Paid'),
('INV-2026-0098', 'OPG-2026-1043', '09 July 2026', 30000.00, 'Paid')
ON CONFLICT (id) DO NOTHING;

-- Seed Users
-- admin@onepg.in / admin
INSERT INTO users (name, email, password_hash, role)
VALUES (
  'Super Admin',
  'admin@onepg.in',
  '$2a$10$mzmpvdozunJFxhEgksNQ8eWzcna/s5ngIsI2T5zC7D0GRKj0QyIbm', -- bcrypt hash for 'admin'
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- rahul@sharmaent.com / admin
INSERT INTO users (name, email, password_hash, role, client_id)
VALUES (
  'Rahul Sharma',
  'rahul@sharmaent.com',
  '$2a$10$mzmpvdozunJFxhEgksNQ8eWzcna/s5ngIsI2T5zC7D0GRKj0QyIbm', -- bcrypt hash for 'admin'
  'client',
  'OPG-2026-1045'
) ON CONFLICT (email) DO NOTHING;

-- Seed Tickets
INSERT INTO tickets (id, client_id, title, status, date, description, severity) VALUES
('TCK-2026-9281', 'OPG-2026-1045', 'Webhook fails to trigger on payment success', 'Resolved', '08 July 2026', 'Webhook event payment.captured does not trigger after client pays.', 'High'),
('TCK-2026-9310', 'OPG-2026-1045', 'Request for T+0 settlement enablement', 'Open', '10 July 2026', 'Our transaction volume has crossed ₹5L/day. Requesting activation of instant settlement rails.', 'Medium')
ON CONFLICT (id) DO NOTHING;
