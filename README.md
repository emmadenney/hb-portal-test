The Portal Test

This application was created using Node.js.

Use the following command to run this application: node index.js <filepath> OR <filename>

Replace <filepath> OR <filename> with either the input CSV filename if it exists in the same directory as index.js, or the absolute/relative path to the input CSV file.

This application takes a CSV file as input, and outputs a new CSV file with the input data updated.
The input data records are first merged to remove any repeating product records by product number. The quantities of a repeating product are summed in one record.
The data is then sorted in ascending order, first by bay (A-Z, AA-AZ) and then by shelf number (1-10).

The functionality of updating the data was developed using Test Driven Development.

The reading and writing of CSV files is handled by csv-parse and csv-stringify from the node-csv suite.
