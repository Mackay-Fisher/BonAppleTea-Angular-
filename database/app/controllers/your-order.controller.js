const { RNGOrder } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { menuItems, /* other data */ } = req.body;

    // Perform logic to update the database with the order details
    const order = await RNGOrder.create({
      order_timestamp: new Date(),
      order_items: menuItems.map(item => item.name), // Change this to suit your data model
      order_total: menuItems.reduce((total, item) => total + item.price, 0),
      // Add other fields as needed
    });

    // Respond with a success message or the created order
    res.json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
