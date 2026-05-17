# Food Order Project

A full-stack food ordering application.

## Technologies Used

### Frontend
- **React** with **Vite**
- **React Router** for routing
- **TailwindCSS** / **PostCSS** for styling (configured via postcss/autoprefixer)

### Backend
- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **JWT** (JSON Web Tokens) for authentication
- **Bcrypt** for password hashing
- **Cloudinary** for image uploads
- **Morgan** for logging

## Project Structure

- `frontend/` - Contains the React Vite application
- `backend/` - Contains the Node.js Express API

## Getting Started

### Prerequisites
- Node.js installed on your machine
- MongoDB instance (local or Atlas)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Food-Order-Project
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` directory with your environment variables (e.g., `PORT`, `MONGODB_URI`, `JWT_SECRET`, Cloudinary credentials).
   - Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   - Create a `.env` file in the `frontend` directory if required for your Vite app (e.g., `VITE_API_URL`).
   - Start the frontend development server:
   ```bash
   npm run dev
   ```

## License
ISC
