const express = require("express");

// Initialize Express application
const app = express();

// Enable CORS for any paths from the client
app.use(cors());

const PORT = process.env.PORT || 3001;



// Add routes
app.use(routes);

// Sync database
