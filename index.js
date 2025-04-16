// Import the express module
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;  // Use the port assigned by Render, or default to 3000

// Define the root route for the homepage
app.get('/', (req, res) => {
  res.send('Welcome to Nepali Text-to-Speech Service!');
});

// Start the server to listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
