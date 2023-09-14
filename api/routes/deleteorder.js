const express = require('express');
const router = express.Router();
const mysql = require('mysql');


const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'MilkDistribution', 
});


conn.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Database Connected');
});

router.post('/', (req, res) => {
    console.log("In delete order");
    
    try {
      const OrderId = req.body.OrderId;
      console.log("Order ID:", OrderId);
  
      if (!OrderId) {
        return res.status(400).json({ error: 'Missing orderId in request' });
      }
  
      const sql = 'UPDATE orders SET OrderStatus = ? WHERE OrderId = ?';
      const values = ['Canceled', OrderId];
  
      conn.query(sql, values, (error, results) => {
        if (error) {
          console.error('Error canceling order:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        // Check if the order was updated successfully
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Order not found' });
        }
  
        // Send a response indicating success
        res.json({ message: 'Order canceled successfully' });
      });
    } catch (error) {
      console.error('Error canceling order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
