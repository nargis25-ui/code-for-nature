# System Architecture

## Overview

The application uses a frontend-backend architecture.

## Technology Layers

### 1. Frontend

React + Vite

The frontend provides:

- Dashboard
- Usage tracking forms
- Sustainability score
- Reports
- AI suggestions
- Prompt Optimizer
- Feedback interface

### 2. Backend

Node.js + Express.js

The backend handles:

- API requests
- User usage data
- Environmental impact calculations
- Communication with AI services

### 3. AI Layer

The AI layer provides:

- Personalized sustainability suggestions
- Prompt optimization
- AI-based recommendations

## Data Flow

User
↓
React Frontend
↓
Express REST API
↓
Calculation / AI Services
↓
Response
↓
React Dashboard

## API Endpoints

POST /api/usage

GET /api/dashboard

GET /api/report

POST /api/suggestions

POST /api/optimize-prompt

POST /api/feedback

## Current Health Check

GET /api/health

This endpoint is used to verify that the backend is running correctly.