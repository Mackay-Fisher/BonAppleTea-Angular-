const e = require("express");
const db = require("../models");
const Ingredient = db.ingredients;
const sequelize = db.sequelize;

// SELECT * FROM ingredients;
exports.findAll = (req, res) => {
    Ingredient.findAll()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving ingredients." }); });
};

// CUSTOM SELECT SQL QUERY
exports.findIngredient = (req, res) => {
    sequelize.query("SELECT * FROM ingredients WHERE ingredient_name = :ingredient", { 
        replacements: { ingredient: 'blackTea' },
        type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(500).send({ message: "Error executing SQL: " + err.message });
    });
};

exports.deleteIngredient = (req, res) => {
    const id = req.params.id;
    Ingredient.destroy({
        where: { ingredient_id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({ message: "Ingredient was deleted successfully!" });
        } else {
            res.send({ message: `Cannot delete Ingredient with id=${id}. Maybe Ingredient was not found!` });
        }
    })
    .catch(err => {
        res.status(500).send({ message: "Could not delete Ingredient with id=" + id });
    });
}

exports.editIngredient = (req, res) => {
    const id = req.params.id;
    Ingredient.update(req.body, {
        where: { ingredient_id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({ message: "Ingredient was updated successfully." });
        } else {
            res.send({ message: `Cannot update Ingredient with id=${id}. Maybe Ingredient was not found or req.body is empty!` });
        }
    })
    .catch(err => {
        res.status(500).send({ message: "Error updating Ingredient with id=" + id });
    });
};

exports.addIngredient = (req, res) => {
    Ingredient.create(req.body)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while creating the Ingredient." }); });
};

exports.getIngredientNames = (req, res) => {
    sequelize.query("SELECT DISTINCT ingredient_name FROM ingredients", { 
        type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(500).send({ message: "Error executing SQL: " + err.message });
    });
};

exports.getIngredientById = (req, res) => {
    const id = req.params.id;
    Ingredient.findByPk(id)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: "Error retrieving Ingredient with id=" + id }); });
}