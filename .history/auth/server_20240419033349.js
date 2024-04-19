const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Endpoint to handle user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Read users from text file
  fs.readFile('users.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Split data into lines and check for user credentials
    const users = data.split('\n').map(line => line.split(','));
    const user = users.find(u => u[0] === username && u[1] === password);

    if (user) {
      const userType = user[2];
      res.send(`Login successful! User type: ${userType}`);
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
