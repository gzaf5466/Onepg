Production test (docker)
========================

This document shows how to run a production-like test using Docker and Docker Compose.

Prerequisites
- Docker and Docker Compose installed on your machine.

Build and run

Set required env vars (example):

```bash
export VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

Start services:

```bash
docker compose up --build
```

This builds the frontend (Vite) and backend (Express) images, serves the frontend via nginx on port 8080, and the API on 5000.

Verify
- Frontend: http://localhost:8080
- Health endpoint: http://localhost:5000/api/health
- Check response headers for the frontend (COOP header):

```bash
curl -I http://localhost:8080
```

Notes
- If you want to run the Nginx proxy on port 80, adjust ports and ensure you have permissions.
- The Dockerfiles are conservative to improve parity with production; adapt base images or build steps to your CI requirements.
