module.exports = app => {
    const inventory = require("../controllers/inventory.controller");

    var router = require("express").Router();

    router.get("/", inventory.findAll);

    router.get("/custom/findItem", inventory.findItem);

    router.delete("/:id", inventory.deleteItem);

    router.put("/:id", inventory.editItem);

    router.post("/", inventory.addItem);

    router.put('/update', inventory.updateInventory);

    router.get("/:id", inventory.getItemById);

    app.use('/api/inventory', router);
};