const db = require("../models");
const { formatDates } = require('../helpers/timeFormatter'); // ADD THIS TO ALL CONTROLLERS THAT USE TIME, CHECK FORMATTING BELOW
const Order = db.orders;
const sequelize = db.sequelize;

// SELECT * FROM orders;
exports.findAll = (req, res) => {
    Order.findAll()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving orders." }); });
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