const db = require("../models");
const { formatDates } = require('../helpers/timeFormatter'); // ADD THIS TO ALL CONTROLLERS THAT USE TIME, CHECK FORMATTING BELOW
const RNGOrder = db.order_history;
const sequelize = db.sequelize;

// SELECT * FROM order-history;
exports.findAll = (req, res) => {
    sequelize.query("SELECT * FROM order_history", { 
        type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(500).send({ message: "Error executing SQL: " + err.message });
    });
};

exports.findMenuIngridents = (req, res) => {
    sequelize.query("SELECT * FROM menu", { 
        type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(500).send({ message: "Error executing SQL: " + err.message });
    });
};

exports.findIngridents = (req, res) => {
    sequelize.query("SELECT * FROM ingredients", { 
        type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(500).send({ message: "Error executing SQL: " + err.message });
    });
};

exports.findInventory = (req, res) => {
    sequelize.query("SELECT * FROM inventory", { 
        type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(500).send({ message: "Error executing SQL: " + err.message });
    });
};



// CUSTOM SELECT SQL QUERY
exports.findEmployeeNum = (req, res) => {
    sequelize.query("SELECT * FROM orders WHERE employee_id = :employeeID", {
        replacements: { employeeID: '1' },
        type: sequelize.QueryTypes.SELECT
    })
        .then(result => {
            const formattedResult = formatDates(result, 'order_timestamp'); // THIS IS FORMATTING, CHECK HELPER FUNCTION
            res.send(formattedResult);
        })
        .catch(err => {
            res.status(500).send({ message: "Error executing SQL: " + err.message });
        });
};

exports.createOrder = (req, res) => {
    const { order_items, order_total, employee_id, customer_id } = req.body;

    RNGOrder.create({
        order_items,
        order_total,
        employee_id,
        customer_id
    })
        .then(order => {
            res.status(201).json(order);
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
};