# EcoAI System Architecture

## 1. Overview

EcoAI is an AI Sustainability Tracker designed to help individuals and organisations understand their resource usage and make more environmentally conscious decisions.

The project uses a frontend, a backend API, and Firebase Firestore for storing usage records.

## 2. Technology Stack

### Frontend
- React
- Vite
- JavaScript
- React Router
- Charting libraries used by the interface
- Lucide React and React Icons

### Backend
- Node.js
- Express.js
- CORS
- dotenv
- Firebase Admin SDK

### Database
- Firebase Firestore
- Usage records are stored in the `usageRecords` collection.

## 3. Architecture Flow

1. The user interacts with the EcoAI frontend.
2. The frontend can send HTTP requests to the backend API.
3. The Express server validates submitted usage values.
4. Valid usage records are saved to Firestore.
5. The backend returns a response to the frontend.

The frontend API base URL can be configured using `VITE_API_BASE_URL`. The default backend URL is `http://localhost:5000`.

## 4. Verified Backend Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/` | Confirms that the backend is running |
| GET | `/api/health` | Returns the backend health status |
| GET | `/api/usage` | Retrieves usage records |
| POST | `/api/usage` | Validates and saves a usage record |

The usage submission accepts non-negative numeric values for electricity, water, e-waste, and AI usage. The exact units should be confirmed in the frontend before interpreting the values.

## 5. Data Storage

Usage records are stored in the Firestore `usageRecords` collection. Each record contains the submitted usage values and a creation timestamp.

Firebase credentials are loaded from a local service account file. This file must remain private and must not be committed to Git or included in public submissions.

## 6. Configuration

The backend uses port `5000` by default and can use the `PORT` environment variable.

The frontend can use this environment variable:

`VITE_API_BASE_URL=http://localhost:5000`

Use local environment files for configuration. Never publish API secrets, private keys, or Firebase service account credentials.

## 7. Current Scope and Limitations

This document describes the verified backend routes and storage design. Other frontend features, calculations, charts, recommendations, reports, and prompt-optimisation functions should be described as implemented only after their behaviour has been tested.

Environmental impact values should be presented as estimates when they are calculated from usage inputs and assumptions. They should not be represented as exact measurements without supporting data.

## 8. Future Improvements

Possible improvements include authentication, stronger validation, automated testing, more detailed reporting, configurable emission factors, and integrations with verified environmental datasets.
