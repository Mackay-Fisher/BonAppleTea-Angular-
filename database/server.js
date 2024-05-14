const express = require("express");
const cors = require("cors");
const path = require('path');
const teamMemberController = require('./app/controllers/teammember.controller');
const nodemailer = require("nodemailer");

const app = express();

const html2canvasProxy = require('html2canvas-proxy');

app.use('/proxy', html2canvasProxy());

var corsOptions = {
  origin: [
    "http://localhost:4200", 
    "https://bonappletea-fbedf.web.app", 
    "https://guidoc-1bdf0.web.app",
    "https://bonappetea-658f7.web.app"
]
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json());

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend tehe :3" });
});

app.get("/alo", (req, res) => {
  teamMemberController.findVictorPan(req, res)
});


// app.use(express.static(path.join(__dirname, '../AngularPosProj/dist/my-new-app')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../AngularPosProj/dist/my-new-appindex.html'));
// });

require("./app/routes/teammember.routes")(app);
require("./app/routes/orders.routes")(app);
require("./app/routes/order-history.routes")(app);
require("./app/routes/menu.routes")(app);
require("./app/routes/inventory.routes")(app);
require("./app/routes/ingredients.routes")(app);
require("./app/routes/employees.routes")(app);
require("./app/routes/customers.routes")(app);
require("./app/routes/stock.routes")(app);

// UNCOMMENT/COMMENT to run TOGETHER/SEPARATELY
// app.use(express.static(path.join(__dirname, '../AngularPosProj/dist/my-new-app')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../AngularPosProj/dist/my-new-app/index.html'));
// });

const managerEmails = [
  'yuki@tamu.edu',
  'mackayfisher17@tamu.edu',
  'cmb6767@tamu.edu',
  'txrangersw@tamu.edu',
  'victor.pan@tamu.edu'
]

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bonappetea7@gmail.com',
    pass: 'ahza qeqo sxub llop'
  }
});

app.post('/send-email', (req, res) => {
  const { customername, customerfeedback } = req.body;

  const mailOptions = {
    from: 'bonappetea7@gmail.com',
    to: 'yuki@tamu.edu',
    subject: `Feedback from ${customername}`,
    text: customerfeedback
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});

// module.exports = app;
