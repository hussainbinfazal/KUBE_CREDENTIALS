# Kube-Credential

A small microservices example demonstrating credential issuance and verification.

This repository contains three backend services (issuance, verification, and a gateway) and a Next.js frontend. It is designed for local development using Docker Compose or for running services individually during development.

## What's included

- backend/
  - Cred-issue/backend — Credential issuance service (TypeScript, Express)
  - Cred-verify/backend — Credential verification service (TypeScript, Express)
  - gateway — Lightweight gateway that forwards requests from the frontend to the backend services
- frontend/ — Next.js application (React + TypeScript)
- docker-compose-dev.yml — Compose file for local development
- docker-compose-prod.yml — Compose file for production-like deployment

## Service responsibilities

- Cred-issue: issue credentials and list issued credentials. Key files: `server.ts`, `routes/issueCred.ts`, `controller/issueController.ts`, `controller/allCredentials.ts`, `model/credModel.ts`.
- Cred-verify: verify credentials. Key files: `server.ts`, `routes/verifyCred.ts`, `controller/verifyController.ts`, `model/credModel.ts`.
- Gateway: `backend/gateway/app.ts` — forwards requests to the correct backend service and exposes a single API surface to the frontend.
- Frontend: Next.js app (pages/components under `frontend/src/app/`) with UI to issue and verify credentials.

## Prerequisites

- Node.js 16+ and npm or yarn
- Docker & Docker Compose (for running the whole stack)
- Optional: MongoDB (if you prefer not to use the Dockerized Mongo in compose)

## Environment variables

Each service has a local `.env` (or `.env.local`) file. Example variables:

- Cred-issue (backend/Cred-issue/backend/.env)
  - PORT=4001
  - MONGO_URI=mongodb://mongo:27017/kube_credentials_issue

- Cred-verify (backend/Cred-verify/backend/.env)
  - PORT=4002
  - MONGO_URI=mongodb://mongo:27017/kube_credentials_verify

- Gateway (backend/gateway/.env.local)
  - PORT=3000
  - ISSUE_SERVICE_URL=http://cred-issue:4001
  - VERIFY_SERVICE_URL=http://cred-verify:4002

- Frontend (frontend/.env or NEXT_PUBLIC_* envs)
  - NEXT_PUBLIC_API_URL=http://localhost:3000

Adjust hostnames when running services without Docker (e.g., use `http://localhost:4001`).

## Run - development (using Docker Compose)

From the repository root (PowerShell example):

```powershell
docker-compose -f docker-compose-dev.yml up --build
```

This starts the gateway, Cred-issue, Cred-verify, frontend, and any required infrastructure (for example, MongoDB) defined in the compose file. The frontend is typically available at `http://localhost:3000`.

To run in detached mode (background):

```powershell
docker-compose -f docker-compose-dev.yml up --build -d
```

To stop and remove containers:

```powershell
docker-compose -f docker-compose-dev.yml down
```

## Run - individual services (local dev)

If you prefer to develop a single service locally, run it directly with npm:

Cred-issue

```powershell
cd backend\Cred-issue\backend
npm install
npm run dev
```

Cred-verify

```powershell
cd backend\Cred-verify\backend
npm install
npm run dev
```

Gateway

```powershell
cd backend\gateway
npm install
npm run dev
```

Frontend (Next.js)

```powershell
cd frontend
npm install
npm run dev
```


## Run - production with Docker Compose

```powershell
docker-compose -f docker-compose-prod.yml up --build -d
```

View logs:

```powershell
docker-compose -f docker-compose-prod.yml logs -f
```

## API endpoints (expected)

Based on the project routes, the following endpoints should be available (via gateway or service ports):

- Cred-issue
  - POST /api/issue — issue a new credential
  - GET /api/credentials — list issued credentials

- Cred-verify
  - POST /api/verify — verify a credential

Example requests (adjust host/port as needed):

Issue a credential:

```bash
curl -X POST http://localhost:3000/api/issue \
  -H "Content-Type: application/json" \
  -d '{"subject":"alice","data":{"role":"admin"}}'
```

Verify a credential:

```bash
curl -X POST http://localhost:3000/api/verify \
  -H "Content-Type: application/json" \
  -d '{"credentialId":"<id>","proof":"<proof>"}'
```

## Tests

Each backend project contains Jest configuration (`test/jest.config.js` or `tests/jest.config.js`). Run tests from the service folder:

```powershell
cd backend\Cred-issue\backend
npm test

cd backend\Cred-verify\backend
npm test
```

## Development assumptions & notes

- Both backend services are TypeScript apps — ensure `ts-node` / `tsc` is available for local development or use the provided npm scripts.
- The gateway expects the issue/verify services to be reachable at the URLs defined in `backend/gateway/.env.local`.
- MongoDB is expected by both services. When using Docker Compose the compose file should include a Mongo service, or set `MONGO_URI` to an external database.


## Troubleshooting

- Port conflicts: change ports in `.env` files or stop the process using the port.
- Docker build issues: try `docker-compose build --no-cache`.
- MongoDB connection failures: confirm `MONGO_URI` and that Mongo is reachable from the services.

