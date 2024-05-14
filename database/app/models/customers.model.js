module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        customer_id: { 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: { type: Sequelize.STRING },
        last_name: { type: Sequelize.STRING },
        phone_number: { type: Sequelize.STRING }
      }, {
          tableName: 'customers',
          timestamps: false // Disable automatic createdAt and updatedAt fields
      });
    return Customer;
  };