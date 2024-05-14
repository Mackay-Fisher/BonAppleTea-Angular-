const db = require("../models");
const Employee = db.employees;
const sequelize = db.sequelize;

// SELECT * FROM employees;
exports.findAll = (req, res) => {
    Employee.findAll()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving employees." }); });
};

// CUSTOM SELECT SQL QUERY
exports.findEmployee = (req, res) => {
    sequelize.query("SELECT * FROM employees WHERE position = :pos", { 
        replacements: { pos: 'CFO' },
        type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(500).send({ message: "Error executing SQL: " + err.message });
    });
};