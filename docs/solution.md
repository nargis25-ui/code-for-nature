# Proposed Solution

## 1. Overview

EcoAI — AI Sustainability Tracker — is a web-based prototype focused on environmental sustainability. It aims to help users record and review resource usage and build awareness of more sustainable choices.

## 2. Main Approach

The project combines a React frontend, an Express backend, and Firebase Firestore storage for usage records.

The verified backend supports:
- Checking backend health.
- Submitting usage records.
- Validating that submitted usage values are non-negative numbers.
- Saving usage records to Firestore.
- Retrieving saved usage records.

The interface may provide additional dashboard or sustainability features. Each feature should be described as available only after it has been tested in the running application.

## 3. Usage Information

The backend accepts values for:
- Electricity usage.
- Water usage.
- E-waste.
- AI usage.

The units and interpretation of these values should be clearly explained in the user interface. The API currently validates numeric values but does not, by itself, verify their physical units or environmental meaning.

## 4. Environmental Estimates

Environmental impact calculations can help users understand potential consequences of resource usage. To make such calculations trustworthy, the project needs documented methods, appropriate emission factors, and clear assumptions.

Any unvalidated result should be presented as an estimate, not as an exact measurement or verified environmental saving.

## 5. Intended Benefits

- Make resource information easier to record and review.
- Encourage awareness of sustainability practices.
- Provide a foundation for progress tracking.
- Support future reporting and evidence-based recommendations.

## 6. Technology

- Frontend: React and Vite.
- Backend: Node.js and Express.
- Database: Firebase Firestore.
- Supporting tools: Firebase Admin SDK and other project dependencies.

## 7. Future Development

Possible future improvements include validated environmental calculations, downloadable reports, user authentication, organisation-level workspaces, and a prompt-efficiency assistant. These are future goals unless they are already implemented and tested.

## 8. Conclusion

EcoAI is a prototype intended to make sustainability-related usage information more accessible. Its long-term value will depend on reliable data, transparent calculations, usability testing, and evidence of real-world benefits.
