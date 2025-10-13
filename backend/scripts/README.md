check_services.js

Usage:

From the `backend` folder run:

node scripts/check_services.js

Environment variables (optional):
- GATEWAY_URL - base URL of the gateway (default: https://kube-credentials-op82.onrender.com)
- ISSUE_URL - full URL to issue service health endpoint (default: `${GATEWAY_URL}/api/issue/health`)
- VERIFY_URL - full URL to verify service health endpoint (default: `${GATEWAY_URL}/api/verify/health`)

This script will print OK/FAIL for each service and include HTTP status and response body when available.
