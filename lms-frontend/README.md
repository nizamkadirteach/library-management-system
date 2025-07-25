# LMS Frontend

This directory contains the React application for the **Library Management System**.

## Prerequisites
- Node.js 18+ and npm
- The backend running at `http://localhost:8081`

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Access the app at `http://localhost:5173`.
4. Build for production and preview the bundle:
   ```bash
   npm run build
   npm run preview
   ```

Lint the code with `npm run lint` and format using `npm run format`.

## About
The frontend is built with React and Vite. Routing is handled with React Router and API calls use Axios (`src/api/axios.js`) which automatically attaches the JWT token.
Tailwind CSS provides styling via `tailwind.config.js`.
The API base URL defaults to `http://localhost:8081/api/` and can be adjusted in `src/api/axios.js`.
