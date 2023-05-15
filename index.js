const fs = require("fs");
const { parse } = require("csv-parse");
const { stringify } = require("csv-stringify");
const process = require("process");
const updateProducts = require("./utils");

if (process.argv.length !== 3) {
  console.log("One input filepath required");
  return;
}

const filepath = process.argv[2];

fs.createReadStream(filepath).pipe(
  parse({ columns: true }, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const updatedData = updateProducts(data);
    stringify(updatedData, { header: true }, function (err, output) {
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
