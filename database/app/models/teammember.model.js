module.exports = (sequelize, Sequelize) => {
  const TeamMember = sequelize.define("teammember", {
      student_name: { 
          type: Sequelize.STRING,
          primaryKey: true  // Set student_name as primary key
      },
      section: { type: Sequelize.INTEGER },
      favorite_movie: { type: Sequelize.STRING }
    }, {
        tableName: 'teammembers',
        timestamps: false // Disable automatic createdAt and updatedAt fields
    });
  return TeamMember;
};