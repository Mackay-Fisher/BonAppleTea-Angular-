const moment = require('moment');


// This formats timestamps with the column name "order_timestamp"
function formatDates(results, dateColumnName) {
  return results.map(row => {
    if (row[dateColumnName]) {
      row[dateColumnName] = moment(row[dateColumnName]).format('YYYY-MM-DD HH:mm:ss');
    }
    return row;
  });
}

module.exports = { formatDates };
