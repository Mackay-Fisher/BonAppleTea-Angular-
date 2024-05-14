module.exports = app => {
    const customers = require("../controllers/customers.controller");

    var router = require("express").Router();

    router.get("/", customers.findAll);

    router.get("/custom/findCustomer", customers.findCustomer);

    app.use('/api/customers', router);
};