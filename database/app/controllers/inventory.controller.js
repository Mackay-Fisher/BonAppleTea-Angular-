const db = require("../models");
const Item = db.inventory;
const sequelize = db.sequelize;

// SELECT * FROM inventory;
exports.findAll = (req, res) => {
    Item.findAll()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving inventory." }); });
};

// CUSTOM SELECT SQL QUERY
exports.findItem = (req, res) => {
    sequelize.query("SELECT * FROM inventory WHERE item_name = :item", {
        replacements: { item: 'straws' },
        type: sequelize.QueryTypes.SELECT
    })
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({ message: "Error executing SQL: " + err.message });
        });
};

exports.deleteItem = (req, res) => {
    const id = req.params.id;
    Item.destroy({
        where: { item_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Item was deleted successfully!" });
            } else {
                res.send({ message: `Cannot delete Item with id=${id}. Maybe Item was not found!` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete Item with id=" + id });
        });
}

exports.editItem = (req, res) => {
    const id = req.params.id;
    Item.update(req.body, {
        where: { item_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Item was updated successfully." });
            } else {
                res.send({ message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating Item with id=" + id });
        });
};

exports.addItem = (req, res) => {
    Item.create(req.body)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while creating the Item." }); });
};

exports.updateInventory = (req, res) => {
    const { item_name, item_quantity } = req.body;

    Item.findOne({ where: { item_name } })
        .then(item => {
            if (item) {
                // Item found, update quantity
                item.update({ item_quantity })
                    .then(updatedItem => {
                        res.json(updatedItem);
                    })
                    .catch(error => {
                        res.status(500).json({ error: 'Internal Server Error' });
                    });
            } else {
                // Item not found, create a new one
                Item.create({ item_name, item_quantity })
                    .then(newItem => {
                        res.status(201).json(newItem);
                    })
                    .catch(error => {
                        res.status(500).json({ error: 'Internal Server Error' });
                    });
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

exports.getItemById = (req, res) => {
    const id = req.params.id;
    Item.findByPk(id)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: "Error retrieving Item with id=" + id }); });
};