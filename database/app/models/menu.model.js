module.exports = (sequelize, Sequelize) => {
    const MenuItem = sequelize.define("menuItem", {
        menu_item_id: { 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        menu_item_name: { type: Sequelize.STRING },
        menu_item_type: { type: Sequelize.STRING },
        menu_item_price: { type: Sequelize.DECIMAL(10, 2) },
        ingredients: { type: Sequelize.ARRAY(Sequelize.TEXT) },
        image: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING }
      }, {
          tableName: 'menu3',
          timestamps: false // Disable automatic createdAt and updatedAt fields
      });
    return MenuItem;
  };