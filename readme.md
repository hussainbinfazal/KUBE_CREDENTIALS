# Credential Issuance & Verification Demo

## Overview
This project demonstrates a **microservices-based credential system** using:

- **Backend**: Node.js + TypeScript + Express + MongoDB
- **Frontend**: Next.js (React + TypeScript)
- **Containerization**: Docker
- **Services**:
  - **Issuance Service**: Issues credentials
  - **Verification Service**: Verifies issued credentials

Each service is **independently scalable** and communicates via JSON APIs.

---

## Folder Structure
root/
├── issuance-service/ # Credential issuance API
├── verification-service/ # Credential verification API
├── frontend/ # Next.js frontend app
├── docker-compose.yml # Local dev setup

yaml
Copy code

---

## Quick Start (Local)
1. Clone repository:
```bash
git clone <repo-url>
cd <repo-folder>
Start services with Docker:

bash
Copy code
docker-compose up --build
Services will be available at:

Issuance: http://localhost:3001/issue

Verification: http://localhost:3002/verify

Frontend: http://localhost:3000

MongoDB (local container) is exposed at mongodb://localhost:27017

Notes
WORKER_ID identifies which container handled a request.

All credentials are stored in MongoDB.

Frontend pages interact with the APIs via fetch calls.

This README is temporary for development purposes.

yaml
Copy code

---

If you want, I can also add a **small example JSON for issuing and verifying credentials** directly in this README — makes it easy for anyone to test your APIs without extra instructions.  

Do you want me to add that?