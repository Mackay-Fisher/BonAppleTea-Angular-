module.exports = app => {
    const employees = require("../controllers/employees.controller");

    var router = require("express").Router();

    router.get("/", employees.findAll);

    router.get("/custom/findEmployee", employees.findEmployee);

    app.use('/api/employees', router);
};