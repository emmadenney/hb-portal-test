const fs = require("fs");
const { parse } = require("csv-parse");
const { stringify } = require("csv-stringify");
const sortData = require("./utils");

fs.createReadStream("./hb_test.csv").pipe(
  parse({ columns: true }, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const sortedData = sortData(data);
    stringify(sortedData, { header: true }, function (err, output) {
      if (err) {
        console.log(err);
        return;
      }
      fs.writeFile("./hb-output.csv", output, function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Data successfully updated and written to CSV file");
      });
    });
  })
);
