module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        item_id: { 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        item_name: { type: Sequelize.STRING },
        item_quantity: { type: Sequelize.INTEGER }
      }, {
          tableName: 'inventory',
          timestamps: false // Disable automatic createdAt and updatedAt fields
      });
    return Item;
  };