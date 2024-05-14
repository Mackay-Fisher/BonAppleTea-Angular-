module.exports = app => {
    const RNGOrder = require("../controllers/order-history.controller");

    var router = require("express").Router();

    router.get("/", RNGOrder.findAll);
    router.get("/ogIn",RNGOrder.findIngridents)
    router.get("/og",RNGOrder.findInventory)

    router.get("/ingredients",RNGOrder.findMenuIngridents)

    router.get("/custom/findEmployeeNum", RNGOrder.findEmployeeNum);

    router.post('/create', RNGOrder.createOrder);

    app.use('/api/order-history', router);
};