# EcoAI — AI Sustainability Tracker

EcoAI is a web-based sustainability project developed by the EcoAI Innovators team at Navgurukul for the FES Code4Nature Challenge 2026.

The project aims to make the environmental impact of everyday digital activities easier to understand. It brings together sustainability tracking, AI usage awareness, and practical ideas for more responsible digital habits.

## The Problem

People use electricity, water, electronic devices, and AI tools every day. However, it can be difficult to understand how these activities relate to environmental sustainability.

EcoAI aims to make this information more accessible and encourage people to make informed, sustainable choices.

## Our Approach

EcoAI focuses on connecting usage information with understandable sustainability insights.

The project explores:
- Tracking electricity, water, electronic waste, and AI usage.
- Presenting sustainability information through a dashboard.
- Helping users understand usage patterns.
- Encouraging practical sustainability improvements.
- Exploring more efficient AI usage and prompt optimization.

The availability of individual features depends on the current application implementation. Estimated or simulated values should not be interpreted as verified environmental measurements.

## Technology Stack

### Frontend
- React
- JavaScript
- Vite
- React Router
- Recharts and Chart.js
- Lucide React and React Icons

### Backend
- Node.js
- Express.js
- Firebase Admin SDK
- Cloud Firestore
- dotenv and CORS

### Development
- Git and GitHub
- npm
- ESLint

## Project Structure

```text
code-for-nature/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── docs/
│   ├── API-CONTRACT.md
│   ├── architecture.md
│   ├── demo-script.md
│   ├── future-scope.md
│   ├── impact.md
│   ├── problem-statement.md
│   └── solution.md
├── MVP.md
├── .gitignore
└── README.md
```

## Requirements

Install the following before starting:

- Node.js and npm
- Git
- A modern web browser
- A Firebase project with Cloud Firestore enabled

Check your installation:

```bash
node -v
npm -v
git --version
```

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/nargis25-ui/code-for-nature.git
cd code-for-nature
```

If you already have the repository, open its directory instead.

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open a second terminal in the repository and run:

```bash
cd ~/Desktop/code-for-nature/backend
npm install
```

If your repository is in another location, replace the path accordingly.

### 4. Configure Firebase credentials

The backend loads Firebase Admin credentials from:

```text
backend/serviceAccountKey.json
```

To configure Firebase:

1. Open the Firebase Console and select your project.
2. Enable Cloud Firestore.
3. Obtain a service-account credential using an appropriate, secure Firebase administrative setup.
4. Place the downloaded credential file at `backend/serviceAccountKey.json`.
5. Keep the credential file private and excluded from Git.

Never commit service-account keys or share their contents publicly. Do not replace the real credential with placeholder values and expect Firebase operations to work.

The backend uses `process.env.PORT` when configured and otherwise defaults to port `5000`.

### 5. Configure the frontend API URL

The frontend can use the following environment variable:

```text
VITE_API_BASE_URL=http://localhost:5000
```

Create `frontend/.env` locally if your frontend requires this setting. The frontend code should not contain Firebase Admin credentials or other server secrets.

Keep local environment files out of version control.

## Run the Application

Run the frontend and backend in separate terminals.

### Start the backend

```bash
cd ~/Desktop/code-for-nature/backend
npm run dev
```

The backend defaults to:

```text
http://localhost:5000
```

Check its health endpoint:

```text
http://localhost:5000/api/health
```

A healthy response looks like:

```json
{
  "status": "OK",
  "message": "Backend is healthy"
}
```

### Start the frontend

In another terminal:

```bash
cd ~/Desktop/code-for-nature/frontend
npm run dev
```

Open the local URL displayed by Vite. It commonly starts at `http://localhost:5173`, but Vite may choose another port if that port is already in use.

### Validate the frontend

From the frontend directory:

```bash
npm run lint
npm run build
```

The lint command checks the code with ESLint. The build command creates the production frontend bundle.

## Backend API

Base URL: `http://localhost:5000`

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/` | Backend status message |
| GET | `/api/health` | Health check |
| GET | `/api/usage` | Retrieve usage records from Firestore |
| POST | `/api/usage` | Validate and save a usage record |

The usage API accepts these numeric fields:

- `electricity`
- `water`
- `ewaste`
- `aiUsage`

Each value must be a finite, non-negative number. Successful creation returns HTTP `201`; invalid input returns HTTP `400`.

Records are stored in the Firestore `usageRecords` collection and include a creation timestamp.

See [API Contract](docs/API-CONTRACT.md) for request and response examples.

## Environmental Impact and Limitations

Usage records and their totals do not automatically establish verified environmental impact.

Reliable environmental estimates depend on appropriate calculation methods, documented assumptions, accurate input data, and relevant data sources. AI-related energy and water use can vary with the model, hardware, workload, data-centre location, and electricity supply.

EcoAI should distinguish measured, estimated, and simulated values wherever applicable. Do not claim verified carbon reductions or energy savings without supporting measurements and a defensible comparison.

## Documentation

- [Minimum Viable Product](MVP.md)
- [Problem Statement](docs/problem-statement.md)
- [Solution Overview](docs/solution.md)
- [System Architecture](docs/architecture.md)
- [API Contract](docs/API-CONTRACT.md)
- [Expected Impact and Limitations](docs/impact.md)
- [Future Scope](docs/future-scope.md)
- [Demo Script](docs/demo-script.md)

## Team

**Team:** EcoAI Innovators
**Institution:** Navgurukul
**Challenge:** FES Code4Nature Challenge 2026
**Theme:** Climate Change and Environmental Sustainability

## Our Goal

We want to make digital sustainability easier to understand and act on—helping people develop more informed habits as the use of digital technologies and AI continues to grow.
