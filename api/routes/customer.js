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

    const insertQuery = `INSERT INTO Customer SET ?`;

    conn.query(insertQuery, add, (err,result) => {
      if (err) {
        console.error('Error storing customer details:', err);
        res.status(500).json({ error: 'An error occurred while storing customer details' });
      } else {
        console.log("Customer Added Successfully");
        const CustomerId = result.insertId;
        console.log(CustomerId);
        res.json({CustomerId});
      }
    });
  } catch (error) {
    console.error('An error occurred', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
