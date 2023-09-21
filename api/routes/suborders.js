var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'MilkDistribution'
});
router.post("/", function (req, res, next) {
    console.log("in sub view order");
    const LoginId  = req.body;
    console.log(LoginId);
    try {
        
        
        conn.query('SELECT so.OrderId,startDate,endDate,totalPrice FROM Subscription_Orders so INNER JOIN orders ON so.OrderId=orders.OrderId AND  orders.CustomerId = ( SELECT CustomerId FROM Customer WHERE LoginId= ? );', [LoginId], function (error, results, fields) {
          if (error) {
            console.error('Error fetching order data:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
    
          if (results.length === 0) {
           
            res.json({ message: 'No orders found' });
          } else {
           
            res.json(results);
          }
        });
    
      } catch (error) {
        console.error('Error in try-catch block:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})
module.exports=router;