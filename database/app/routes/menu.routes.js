module.exports = app => {
    const menu = require("../controllers/menu.controller");

    var router = require("express").Router();

    router.get("/", menu.findAll);

    router.get("/:itemType", menu.findItemType);

    router.get("/:itemType/:itemName", menu.findItem);

    router.delete("/:id", menu.deleteItem);

    router.put("/:id", menu.editItem);

    router.post("/", menu.addItem);

    router.get("/menu/item/types", menu.getMenuItemTypes);

    router.get("/get/by/:id", menu.getMenuItemById);

    router.get("/:itemName", menu.findItemQuantity);

    app.use('/api/menu', router);
};