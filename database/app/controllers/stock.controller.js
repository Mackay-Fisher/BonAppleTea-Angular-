const db = require("../models");
const stockItem = db.stock;
const sequelize = db.sequelize;


exports.updateQuantity = (req, res) => {
    const name = req.params.itemName;

    stockItem.decrement('stock', { where: { menu_item_name: name } })
    .then(result => {
        if (result[0][1] > 0) {
            res.send({ message: "Item stock was decremented successfully." });
        } else {
            res.status(404).send({ message: `Item with name=${name} not found or already at zero stock.` });
        }
    })
    .catch(err => {
        res.status(500).send({ message: "Error updating Item with name=" + name });
    });
};

exports.findQuantity = (req, res) => {
    const itemName = req.params.itemName; // Matches ':name' in the route
    // Log to check the received parameters
    console.log(req.params)
    sequelize.query("SELECT stock FROM stock WHERE menu_item_name = :name", { 
        replacements: { name: itemName},
        type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(500).send({ message: "Error executing SQL: " + err.message });
    });
};