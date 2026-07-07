# NexHeal API Overview

Base URL: `http://localhost:5000/api/v1`

## Common Headers
- `Authorization`: `Bearer <JWT_TOKEN>`
- `Content-Type`: `application/json`
- `x-idempotency-key`: `UUID` (Optional, for critical POST requests)

## Modules

### Authentication (`/auth`)
- `POST /register`: Register a new user.
- `POST /login`: Authenticate and receive JWT.
- `GET /me`: Retrieve current user profile.

### AI Intelligence (`/ai`)
- `POST /symptom-checker`: Analyze patient symptoms.
- `POST /hospital-erp`: Extract entities from operational requests.

### Electronic Health Records (`/ehr`)
- `GET /`: List patient records (RBAC protected).
- `POST /`: Create new record (Doctors only).

### Appointments (`/appointments`)
- `GET /`: List appointments for user/doctor.
- `POST /`: Request a new appointment.

### Analytics (`/analytics`)
- `GET /healthcare`: Healthcare aggregate metrics.
- `GET /emergency`: Emergency aggregate metrics.
- `POST /export`: Export BI reports to PDF/CSV.
