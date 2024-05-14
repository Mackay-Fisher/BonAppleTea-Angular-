module.exports = app => {
    const orders = require("../controllers/orders.controller");

    var router = require("express").Router();

    router.get("/", orders.findAll);

    router.get("/custom/findEmployeeNum", orders.findEmployeeNum);

    app.use('/api/orders', router);
};