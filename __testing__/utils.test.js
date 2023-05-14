const updateProducts = require("../utils");

describe("updateProducts", () => {
  test("should return an array of objects with keys: product_code, quantity, pick_location", () => {
    const input = [
      { product_code: "15248", quantity: "10", pick_location: "AB 10" },
      { product_code: "25636", quantity: "1", pick_location: "C 8" },
      { product_code: "26982", quantity: "1", pick_location: "AF 7" },
    ];
    const output = updateProducts(input);
    expect(output).toBeInstanceOf(Array);
    output.forEach((obj) => {
      expect(obj).toMatchObject({
        product_code: expect.any(String),
        quantity: expect.any(String),
        pick_location: expect.any(String),
      });
    });
  });
  test("should return a new array", () => {
    const input = [
      { product_code: "15248", quantity: "10", pick_location: "AB 10" },
      { product_code: "25636", quantity: "1", pick_location: "C 8" },
    ];
    expect(updateProducts(input)).not.toBe(input);
  });
  test("should not mutate input data", () => {
    const input = [
      { product_code: "15248", quantity: "10", pick_location: "AB 10" },
      { product_code: "25636", quantity: "1", pick_location: "C 8" },
      { product_code: "15248", quantity: "5", pick_location: "AB 10" },
    ];
    const copy = [
      { product_code: "15248", quantity: "10", pick_location: "AB 10" },
      { product_code: "25636", quantity: "1", pick_location: "C 8" },
      { product_code: "15248", quantity: "5", pick_location: "AB 10" },
    ];
    updateProducts(input);
    expect(input).toEqual(copy);
  });
  test("should only return one object per product based on product code, with quantities summed", () => {
    const input = [
      { product_code: "15248", quantity: "10", pick_location: "B 10" },
      { product_code: "25636", quantity: "1", pick_location: "C 8" },
      { product_code: "15248", quantity: "5", pick_location: "B 10" },
    ];
    const output = [
      { product_code: "15248", quantity: "15", pick_location: "B 10" },
      { product_code: "25636", quantity: "1", pick_location: "C 8" },
    ];
    expect(updateProducts(input)).toEqual(output);
  });
  test("should return an array of objects sorted in ascending number by single bay character", () => {
    const input = [
      { product_code: "15248", quantity: "10", pick_location: "B 10" },
      { product_code: "25636", quantity: "1", pick_location: "C 8" },
      { product_code: "26982", quantity: "1", pick_location: "F 7" },
      { product_code: "36389", quantity: "4", pick_location: "A 5" },
    ];
    const output = [
      { product_code: "36389", quantity: "4", pick_location: "A 5" },
      { product_code: "15248", quantity: "10", pick_location: "B 10" },
      { product_code: "25636", quantity: "1", pick_location: "C 8" },
      { product_code: "26982", quantity: "1", pick_location: "F 7" },
    ];
    expect(updateProducts(input)).toEqual(output);
  });
  test("should return an array of objects sorted in ascending number by double bay characters", () => {
    const input = [
      { product_code: "26982", quantity: "1", pick_location: "AF 7" },
      { product_code: "15248", quantity: "10", pick_location: "AB 10" },
      { product_code: "36389", quantity: "4", pick_location: "AC 5" },
    ];
    const output = [
      { product_code: "15248", quantity: "10", pick_location: "AB 10" },
      { product_code: "36389", quantity: "4", pick_location: "AC 5" },
      { product_code: "26982", quantity: "1", pick_location: "AF 7" },
    ];
    expect(updateProducts(input)).toEqual(output);
  });
  // NEXT TEST NEEDS TO RETURN RECORDS SORTED BY SHELF NUMBER 1-10
});

// [
// { product_code: "15248", quantity: "10", pick_location: "AB 10" },
// { product_code: "25636", quantity: "1", pick_location: "C 8" },
// { product_code: "26982", quantity: "1", pick_location: "AF 7" },
// { product_code: "36389", quantity: "4", pick_location: "AC 5" },
//   { product_code: "25214", quantity: "10", pick_location: "A 1" },
//   { product_code: "15248", quantity: "5", pick_location: "AB 10" },
//   { product_code: "23689", quantity: "10", pick_location: "X 10" },
//   { product_code: "11224", quantity: "8", pick_location: "AZ 4" },
//   { product_code: "15178", quantity: "9", pick_location: "D 4" },
//   { product_code: "30124", quantity: "5", pick_location: "A 1" },
//   { product_code: "88958", quantity: "4", pick_location: "AZ 10" },
//   { product_code: "14789", quantity: "3", pick_location: "AM 9" },
//   { product_code: "33331", quantity: "6", pick_location: "AC 4" },
//   { product_code: "52568", quantity: "7", pick_location: "AB 10" },
//   { product_code: "23568", quantity: "8", pick_location: "AH 8" },
//   { product_code: "26897", quantity: "9", pick_location: "AL 2" },
//   { product_code: "12456", quantity: "10", pick_location: "AB 9" },
//   { product_code: "12345", quantity: "15", pick_location: "L 3" },
//   { product_code: "12879", quantity: "12", pick_location: "AL 7 " },
// ];
