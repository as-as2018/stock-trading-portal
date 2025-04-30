# Stock Trading Portal

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher recommended)
- npm (comes with Node.js)
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/as-as2018/stock-trading-portal
   cd stock-trading-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The server will be running at: `http://localhost:5000` (or the port you specified)

### API Endpoints

- `GET /` - Home route to check if backend is running
- `POST /api/auth` - Authentication routes
- `GET/POST /api/trades` - Trade related routes
- `GET/POST /api/lots` - Lot related routes

### Running Tests

To run tests, use:
```bash
npm test
```

---

This project uses Express.js, MongoDB, and JWT for authentication.
