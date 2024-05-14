module.exports = (sequelize, Sequelize) => {
    const stockItem = sequelize.define("stockItem", {
        menu_item_name: { 
            type: Sequelize.STRING,
            primaryKey: true
        },
        stock: { type: Sequelize.INTEGER }
      }, {
          tableName: 'stock',
          timestamps: false // Disable automatic createdAt and updatedAt fields
      });
    return stockItem;
  };