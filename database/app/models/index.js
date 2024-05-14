const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
let initialLogsSkipped = false;
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: msg => {
    if (!initialLogsSkipped) {
      if (msg == "Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'order_history' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;") {
        initialLogsSkipped = true; // The msg is the final line before "Synced db." // The change isn't needed, but it gives a cleaner log
      }
      return;
    }
    console.log(msg); // Log subsequent SQL commands
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.teammembers = require("./teammember.model.js")(sequelize, Sequelize);
db.customers = require("./customers.model.js")(sequelize, Sequelize);
db.employees = require("./employees.model.js")(sequelize, Sequelize);
db.ingredients = require("./ingredients.model.js")(sequelize, Sequelize);
db.inventory = require("./inventory.model.js")(sequelize, Sequelize);
db.menu = require("./menu.model.js")(sequelize, Sequelize);
db.orders = require("./orders.model.js")(sequelize, Sequelize);
db.order_history = require("./order-history.model.js")(sequelize, Sequelize);
db.stock = require("./stock.model.js")(sequelize, Sequelize);

module.exports = db;