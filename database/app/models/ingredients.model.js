module.exports = (sequelize, Sequelize) => {
    const Ingredient = sequelize.define("ingredient", {
        ingredient_id: { 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ingredient_name: { type: Sequelize.STRING(255) },
        ingredient_quantity: { type: Sequelize.INTEGER }
      }, {
          tableName: 'ingredients',
          timestamps: false // Disable automatic createdAt and updatedAt fields
      });
    return Ingredient;
  };