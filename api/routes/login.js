const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'MilkDistribution'
});

conn.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Database Connected');
});

router.post('/', async (req, res) => {
  
  const email=req.body.email;
  const pass=req.body.password;
  console.log(email);

  const selectQuery=`SELECT LoginId FROM LoggedIn WHERE Email= ? AND Pass = ?`;
  conn.query(selectQuery, [email, pass], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'An error occurred during login' });
    }

    if (results.length === 1) {
      // User found, send user data in the response
      const user = results[0];
      console.log(user);
      return res.status(200).json({ message: 'Login successful', user });
    } else {
      // User not found or invalid credentials, send an error response
      return res.status(401).json({ message: 'Login failed' });
    }
  });
});

module.exports = router;
