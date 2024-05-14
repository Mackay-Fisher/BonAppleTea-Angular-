const db = require("../models");
const TeamMember = db.teammembers;
const sequelize = db.sequelize;

// Create and Save a new TeamMember
exports.create = (req, res) => {
    // Validate request
    if (!req.body.student_name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a TeamMember
    const teamMember = {
        student_name: req.body.student_name,
        section: req.body.section,
        favorite_movie: req.body.favorite_movie
    };

    // Save TeamMember in the database
    TeamMember.create(teamMember)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while creating the TeamMember." }); });
};

// Retrieve all TeamMembers from the database.
exports.findAll = (req, res) => {
    TeamMember.findAll()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving teammembers." }); });
};

// Find a single TeamMember with an student_name
exports.findOneByName = (req, res) => {
    const student_name = req.params.student_name;

    TeamMember.findOne({ where: { student_name: student_name } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({ message: `Cannot find TeamMember with student_name=${student_name}.` });
            }
        })
        .catch(err => { res.status(500).send({ message: "Error retrieving TeamMember with student_name=" + student_name }); });
};

// Update a TeamMember identified by the student_name in the request
exports.updateByName = (req, res) => {
    const student_name = req.params.student_name;

    TeamMember.update(req.body, { where: { student_name: student_name } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "TeamMember was updated successfully." });
            } else {
                res.send({ message: `Cannot update TeamMember with student_name=${student_name}. Maybe TeamMember was not found or req.body is empty!` });
            }
        })
        .catch(err => { res.status(500).send({ message: "Error updating TeamMember with student_name=" + student_name }); });
};

// Delete a TeamMember with the specified student_name in the request
exports.deleteByName = (req, res) => {
    const student_name = req.params.student_name;

    TeamMember.destroy({ where: { student_name: student_name } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "TeamMember was deleted successfully!" });
            } else {
                res.send({ message: `Cannot delete TeamMember with student_name=${student_name}. Maybe TeamMember was not found!` });
            }
        })
        .catch(err => { res.status(500).send({ message: "Could not delete TeamMember with student_name=" + student_name }); });
};

exports.findVictorPan = (req, res) => {
  sequelize.query("SELECT * FROM teammembers WHERE student_name = :studentName", { 
      replacements: { studentName: 'victor pan' },
      type: sequelize.QueryTypes.SELECT
  })
  .then(result => {
      res.send(result);
  })
  .catch(err => {
      res.status(500).send({ message: "Error executing SQL: " + err.message });
  });
};
