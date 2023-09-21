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
  try {
    console.log("in customer");
    const add = {
      customerName: req.body.customerName,
      street: req.body.street,
      landmark: req.body.landmark,
      City: req.body.city,
      zipCode: req.body.zipCode,
      phoneNumber: req.body.phoneNumber,
      State: req.body.state
    };

    const signadd = {
      Email: req.body.email,
      Pass: req.body.password
    };

    // Create an array of promises for each query
    const queryPromises = [
      new Promise((resolve, reject) => {
        const insertQuery = `INSERT INTO Customer SET ?`;
        conn.query(insertQuery, add, (err, result) => {
          if (err) {
            console.error('Error storing customer details:', err);
            reject(err);
          } else {
            console.log("Customer Added Successfully");
            resolve(result);
          }
        });
      }),

      new Promise((resolve, reject) => {
        const signupQuery = `INSERT INTO LoggedIn SET ?`;
        conn.query(signupQuery, signadd, (err, result) => {
          if (err) {
            console.error('Error storing signup details:', err);
            reject(err);
          } else {
            console.log("Signup Added Successfully");
            resolve(result);
          }
        });
      })
    ];

    // Run both queries concurrently using Promise.all()
    Promise.all(queryPromises)
      .then(([customerResult, signupResult]) => {
        const LoginId = signupResult.insertId;
        console.log(LoginId);
        res.json({ LoginId });
      })
      .catch((error) => {
        console.error('An error occurred', error);
        res.status(500).json({ error: 'An error occurred' });
      });
  } catch (error) {
    console.error('An error occurred', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
