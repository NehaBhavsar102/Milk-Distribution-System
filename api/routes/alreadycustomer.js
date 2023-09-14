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
    console.log("in already customer");
    try {
      const { phoneNumber } = req.body;
      conn.query(
        'SELECT CustomerId FROM Customer WHERE phoneNumber= ?',
        [phoneNumber],
        function (error, results, fields) {
          if (error) {
            console.error('Error fetching order data:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
  
          if (results.length === 0) {
            res.json({ message: 'No orders found for this phone number.' });
          } else {
            const customerId = results[0].CustomerId;
            if (customerId) {
              res.json({ customerId });
            } else {
              res.json({ message: 'CustomerId not found for this phone number.' });
            }
          }
        }
      );
    } catch (error) {
      console.error('Error in try-catch block:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = router;