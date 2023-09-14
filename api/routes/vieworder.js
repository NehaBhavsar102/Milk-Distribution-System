var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'MilkDistribution'
});
router.post("/", async function (req, res, next) {
  console.log("in view order")
  try {
    const { LoginId } = req.body;

    
    conn.query('SELECT OrderId,customerName, OrderType, itemQuantity, totalPrice, OrderStatus FROM Customer INNER JOIN orders ON Customer.CustomerId = orders.CustomerId WHERE Customer.LoginId = ?', [LoginId], function (error, results, fields) {
      if (error) {
        console.error('Error fetching order data:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (results.length === 0) {
        // Handle the case where no results are found
        res.json({ message: 'No orders found for this phone number.' });
      } else {
        // Send the results as JSON
        res.json(results);
      }
    });

  } catch (error) {
    console.error('Error in try-catch block:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
