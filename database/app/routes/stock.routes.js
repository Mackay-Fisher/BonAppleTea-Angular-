module.exports = app => {
    const menu = require("../controllers/stock.controller");

    var router = require("express").Router();

    router.get("/:itemName", menu.findQuantity);

    router.put("/:itemName", menu.updateQuantity)

    app.use('/api/stock', router);
};