# EcoAI – AI Sustainability Tracker

## About the Project

EcoAI is a web application developed by our team for the Code4Nature Challenge 2026 at Navgurukul.

We use digital devices and AI tools in our daily lives, but we do not always think about their environmental impact. Our project aims to help users understand this impact through information about electricity usage, water usage, electronic waste, and AI usage.

The goal is to make environmental information easier to understand and encourage more responsible use of digital technology.

## Problem Statement

The use of digital devices and AI tools is increasing. However, it can be difficult for individuals to understand the resources associated with their digital activities.

EcoAI aims to make sustainability information more accessible and help users become more aware of their digital habits.

## Features

The project focuses on the following areas:

- **Sustainability dashboard:** Displays a summary of sustainability-related information.
- **Electricity usage:** Tracks electricity-related values.
- **Water usage:** Tracks water-related values.
- **E-waste:** Records information about electronic waste.
- **AI usage:** Tracks AI usage using prompt counts.
- **Dashboard summary:** Calculates totals from the usage records received by the backend.

The backend currently provides API routes for recording usage and retrieving a dashboard summary. The availability of these features in the user interface depends on the current frontend implementation.

## Technology Stack

**Frontend**
- React
- JavaScript
- Vite
- React Router
- Recharts and Chart.js for charts
- Lucide React and React Icons

**Backend**
- Node.js
- Express.js
- CORS

**Development tools**
- Git and GitHub
- npm
- ESLint

## Project Structure

```text
code-for-nature/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── docs/
│   ├── API-CONTRACT.md
│   ├── architecture.md
│   ├── demo-script.md
│   ├── future-scope.md
│   ├── impact.md
│   ├── problem-statement.md
│   └── solution.md
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── MVP.md
└── README.md
```

## Requirements

Before running the project, install:

- Node.js and npm
- Git
- A web browser

Check whether they are installed:

```bash
node -v
npm -v
git --version
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/nargis25-ui/code-for-nature.git
cd code-for-nature
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open another terminal and run:

```bash
cd ~/Desktop/code-for-nature/backend
npm install
```

If you cloned the project into a different location, use that location instead.

## Running the Project

The frontend and backend run separately, so start them in two terminals.

### Start the backend

In the first terminal:

```bash
cd ~/Desktop/code-for-nature/backend
npm run dev
```

The backend runs on port 5000 by default.

To check whether it is running, open:

http://localhost:5000/api/health

A successful response should contain a status of `OK`.

### Start the frontend

In the second terminal:

```bash
cd ~/Desktop/code-for-nature/frontend
npm run dev
```

Open the local URL displayed by Vite. The default is:

http://localhost:5173

### Build the frontend

To create a production build, run:

```bash
cd ~/Desktop/code-for-nature/frontend
npm run build
```

### Check the frontend code

To run ESLint, use:

```bash
npm run lint
```

## Backend API

The backend uses Express.js to handle API requests.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Checks the API's root route |
| GET | `/api/health` | Checks backend health |
| POST | `/api/usage` | Adds a usage record |
| GET | `/api/dashboard` | Returns totals for recorded usage |

### Recording usage

Send a POST request to `/api/usage` with a JSON body containing four non-negative numbers:

```json
{
  "electricity": 2.5,
  "water": 10,
  "ewaste": 0.2,
  "aiUsage": 15
}
```

The backend checks that all four values are numbers and are not negative. It then creates a record with an ID and timestamp.

### Dashboard summary

A GET request to `/api/dashboard` returns the number of records, their totals, and the units used by the API.

The current units are:

- Electricity: kWh
- Water: liters
- E-waste: kg
- AI usage: prompts

### Data storage

Usage records are currently stored in an in-memory array in the backend. They are not saved to a database, so the records are cleared when the backend restarts.

## Environmental Impact Estimates

The project focuses on making digital sustainability information easier to understand.

The values entered into the backend are used to calculate totals. These totals should not automatically be treated as verified environmental impact measurements. Reliable environmental estimates require appropriate calculation methods, input data, and documented assumptions.

The methods and assumptions used by the project should be explained in the impact documentation.

## Project Documentation

Additional information about the project is available in the `docs/` folder:

- `problem-statement.md` – the problem the project addresses.
- `solution.md` – the proposed solution.
- `architecture.md` – the project architecture.
- `API-CONTRACT.md` – API details.
- `impact.md` – environmental impact information.
- `future-scope.md` – possible future improvements.
- `demo-script.md` – demonstration notes.

`MVP.md` contains information about the minimum viable product.

## Future Improvements

Possible improvements include:

- Saving usage records in a database.
- Improving environmental impact calculations.
- Adding more detailed reports and visualizations.
- Providing useful suggestions for reducing digital impact.
- Improving the tracking of AI usage.
- Making the application useful for more users and organizations.

These are possible improvements and are not necessarily available in the current version.

## Team

**Team Name:** EcoAI Innovators

**Institution:** Navgurukul

**Challenge:** Code4Nature Challenge 2026

**Team Members:**
- Nargis – Team Lead
- Payal
- Sakshi Suman
- Anamika

## License and Attribution

The Code4Nature Challenge 2026 guidelines specify CC BY or CC BY-NC licensing for submissions.

The project team needs to select the appropriate license and include the relevant license file and attribution information. External code, datasets, images, and other resources must be credited according to their applicable license terms.

The backend's `package.json` currently contains an ISC license declaration. This does not, by itself, establish the required license for the entire Code4Nature submission. The project licensing should be reviewed and aligned with the challenge requirements before final submission.
