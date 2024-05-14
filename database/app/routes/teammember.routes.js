module.exports = app => {
    const teammembers = require("../controllers/teammember.controller");

    var router = require("express").Router();

    // URL is get by default. POST is used by frontend

    // Create a new TeamMember
    router.post("/", teammembers.create);

    // Retrieve all TeamMembers
    router.get("/", teammembers.findAll);

    // URL is get by default. PUT and DELETE are used by frontend

    // Retrieve a single TeamMember by name (assuming names are unique)
    router.get("/:student_name", teammembers.findOneByName);

    // Update a TeamMember by name
    router.put("/:student_name", teammembers.updateByName);

    // Delete a TeamMember by name
    router.delete("/:student_name", teammembers.deleteByName);

    // Route to find Victor Pan
    router.get("/custom/findVictorPan", teammembers.findVictorPan);

    // query results are routed to this url
    // EX: localhost:3000/api/teammembers/custom/findVictorPan would show the one above
    app.use('/api/teammembers', router);
};
