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
  console.log("In Get Customer");
    const LoginId=req.body.LoginId;
   
    console.log(LoginId);
  
    const selectQuery=`SELECT CustomerId FROM customer WHERE LoginId = ?`;
    conn.query(selectQuery, [LoginId], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'An error occurred during login' });
      }
  
      if (results.length === 1) {
       
        const user = results[0];
        console.log(user);
        return res.status(200).json({ message: 'Get Customer successful', user });
      } else {
        
        return res.status(401).json({ message: 'No Customer,failed' });
      }
    });
  });
  
  module.exports = router;