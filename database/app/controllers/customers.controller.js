const db = require("../models");
const Customer = db.customers;
const sequelize = db.sequelize;

// SELECT * FROM customers;
exports.findAll = (req, res) => {
    Customer.findAll()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving customers." }); });
};

// CUSTOM SELECT SQL QUERY
exports.findCustomer = (req, res) => {
    sequelize.query("SELECT * FROM customers WHERE customer_id = :id", { 
        replacements: { id: '1' },
        type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(500).send({ message: "Error executing SQL: " + err.message });
    });
};