const fs = require("fs");
const { parse } = require("csv-parse");
const { stringify } = require("csv-stringify");

// create a utils function that sorts the input Data
function updateData(data) {
  const newData = data.map((product) => {
    product.quantity++;
    return product;
  });
  return newData;
}

fs.createReadStream("./hb_test.csv").pipe(
  parse({ columns: true }, function (err, data) {
    console.log(err);
    // below function needs to change
    const updatedData = updateData(data);
    stringify(updatedData, { header: true }, function (err, output) {
      console.log(err);
      console.log(output);
      fs.writeFile("./hb-output.csv", output, function (err) {
        console.log(err);
      });
    });
  })
);

// module.export the utils function for testing
