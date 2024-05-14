module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
        employee_id: { 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: { type: Sequelize.STRING },
        last_name: { type: Sequelize.STRING },
        position: { type: Sequelize.STRING }
      }, {
          tableName: 'employees',
          timestamps: false // Disable automatic createdAt and updatedAt fields
      });
    return Employee;
  };