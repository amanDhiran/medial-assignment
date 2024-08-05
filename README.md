# Dynamic Post Page with OG Image Generation

This project consists of a React frontend and a Node.js Express backend for creating dynamic post pages with automatic Open Graph (OG) image generation.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/amanDhiran/medial-assignment
cd medial-assignment
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory and add necessary environment variables:

```
VITE_APP_BACKEND_URL= ""

VITE_APP_FRONTEND_URL= ""
```

### 3. Backend Setup

```bash
cd ../backend
npm install
```
Create a `.env` file in the `frontend` directory and add necessary environment variables:

```
BACKEND_URL = ""

FRONTEND_URL = ""
```

### 4. Running the Application

Start the backend server:

```bash
cd backend
npm run start
```

In a new terminal, start the frontend development server:

```bash
cd frontend
npm run dev
```

The application should now be running. Access the frontend at `http://localhost:5173` and the backend API at `http://localhost:3001`.

## Additional Configuration

- Adjust the `.env` files as needed for your specific environment.
- Ensure all required dependencies are installed for both frontend and backend.

## Troubleshooting

If you encounter any issues during setup, please check the following:

- Ensure all environment variables are correctly set.
- Verify that the port 3001 and port 5173 are available on your system.
- Check for any error messages in the terminal where you're running the servers.
