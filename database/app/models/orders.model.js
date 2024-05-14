const moment = require('moment');

module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        order_id: { 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_timestamp: { type: Sequelize.DATE,
          get() {
            const rawValue = this.getDataValue('order_timestamp');
            return rawValue ? moment(rawValue).format('YYYY-MM-DD HH:mm:ss') : null;
          }
        },
        order_items: { type: Sequelize.ARRAY(Sequelize.TEXT) },
        order_total: { type: Sequelize.DECIMAL(10, 2) },
        employee_id: { type: Sequelize.INTEGER },
        customer_id: { type: Sequelize.INTEGER }
      }, {
          tableName: 'orders',
          timestamps: false // Disable automatic createdAt and updatedAt fields
      });
    return Order;
  };