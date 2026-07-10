// API Configuration
// In production, set REACT_APP_API_URL in your Vercel env vars
// For Render backend, set this to your Render URL (e.g. https://your-app.onrender.com)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default API_BASE_URL;
