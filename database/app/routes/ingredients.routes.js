module.exports = app => {
    const ingredients = require("../controllers/ingredients.controller");

    var router = require("express").Router();

    router.get("/", ingredients.findAll);

    router.get("/custom/findIngredient", ingredients.findIngredient);

    router.delete("/:id", ingredients.deleteIngredient);

    router.put("/:id", ingredients.editIngredient);

    router.post("/", ingredients.addIngredient);

    router.get("/ingredientNames", ingredients.getIngredientNames);

    router.get("/get/by/:id", ingredients.getIngredientById);

    app.use('/api/ingredients', router);
};