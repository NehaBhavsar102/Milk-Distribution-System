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

  console.log("in orders");

  var orderData = {
    OrderType: req.body.orderType,
    itemQuantity: req.body.itemQuantity,
    totalPrice: req.body.totalPrice,
    OrderStatus: 'Not delivered',
    CustomerId:req.body.CustomerId
  };

  // Start a MySQL transaction
  conn.beginTransaction(function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Transaction start error' });
    }

    const insertOrderQuery = `INSERT INTO Orders SET ?`;

    conn.query(insertOrderQuery, orderData, function (err, result) {
      if (err) {
        console.error('Error storing order details:', err);
        // Rollback the transaction if there's an error
        conn.rollback(function () {
          throw err;
        });
      }
      else {
        console.log("Order Successful");
        const orderId = result.insertId; // Get the orderId of the inserted order

        // Check if it's a subscription order
        if (req.body.isSubscriptionOrder) {
          var subscriptionData = {
            OrderId: orderId,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            subscribeDays: req.body.daysDifference
          };

          const insertSubscriptionQuery = `INSERT INTO Subscription_Orders SET ?`;

          conn.query(insertSubscriptionQuery, subscriptionData, function (err, result) {
            if (err) {
              console.error('Error storing subscription order details:', err);
              // Rollback the transaction if there's an error
              conn.rollback(function () {
                throw err;
              });
            } else {
              console.log("Subscription Order Added Successfully");
            }

            // Commit the transaction
            conn.commit(function (err) {
              if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Transaction commit error' });
              }
              res.json({ orderId });
            });
          });
        } else {
          // If it's not a subscription order, just commit the transaction
          conn.commit(function (err) {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: 'Transaction commit error' });
            }
           res.json({ orderId }); // Send the orderId as a response
          });
        }
      }
    });
  });
});

module.exports = router;
