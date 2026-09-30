# API Contract

## Base URL

Development:

http://localhost:5000

---

# 1. Health Check

## GET /api/health

Used to check whether the backend is running.

### Response

```json
{
  "status": "OK",
  "message": "Backend is healthy"
}

