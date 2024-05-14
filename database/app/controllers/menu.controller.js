const db = require("../models");
const MenuItem = db.menu;
const sequelize = db.sequelize;

// SELECT * FROM menu2;
exports.findAll = (req, res) => {
    MenuItem.findAll()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving menu." }); });
};

exports.findItemType = (req, res) => {
    const itemType = req.params.itemType;

    sequelize.query("SELECT * FROM menu3 WHERE menu_item_type = :type", { 
        replacements: { type: itemType },
        type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(500).send({ message: "Error executing SQL: " + err.message });
    });
};

exports.findItem = (req, res) => {
    const itemName = req.params.itemName; // Matches ':name' in the route
    const itemType = req.params.itemType; // Matches ':type' in the route
    // Log to check the received parameters
    console.log(req.params)
    sequelize.query("SELECT * FROM menu3 WHERE menu_item_name = :name AND menu_item_type = :type", { 
        replacements: { name: itemName, type: itemType },
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
    MenuItem.destroy({
        where: { menu_item_id: id }
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
    MenuItem.update(req.body, {
        where: { menu_item_id: id }
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
    console.log("Request body:", req.body);
    MenuItem.create(req.body)
        .then(data => res.send(data))
        .catch(err => {
            console.error("Error adding item:", err);
            res.status(500).send({ 
                message: err.message || "Some error occurred while adding the Item." 
            });
        });
};

exports.getMenuItemTypes = (req, res) => {
    sequelize.query("SELECT DISTINCT menu_item_type FROM menu2", { 
        type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(500).send({ message: "Error executing SQL: " + err.message });
    });
};

exports.getMenuItemById = (req, res) => {
    const id = req.params.id;
    MenuItem.findByPk(id)
        .then(data => res.send(data))
        .catch(err => {
            console.error("Error getting item:", err);
            res.status(500).send({ 
                message: err.message || `Some error occurred while getting the Item with id=${id}.` 
            });
        });
}

exports.findItemQuantity = (req, res) => {
    const itemName = req.params.itemName; // Matches ':name' in the route
    // Log to check the received parameters
    console.log(req.params)
    sequelize.query("SELECT Stock FROM menu3 WHERE menu_item_name = :name", { 
        replacements: { name: itemName},
        type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(500).send({ message: "Error executing SQL: " + err.message });
    });
};