function mergeProducts(products) {
  const copyProducts = products.map((product) => {
    return { ...product };
  });

  const mergedProducts = {};

  for (const product of copyProducts) {
    product.quantity = parseInt(product.quantity);
    const product_code = product.product_code;
    const quantity = product.quantity;

    if (mergedProducts.hasOwnProperty(product_code)) {
      mergedProducts[product_code].quantity += quantity;
    } else {
      mergedProducts[product_code] = { ...product };
    }
  }

  return Object.values(mergedProducts).map((product) => {
    product.quantity = product.quantity.toString();
    return product;
  });
}

function sortProducts(products) {
  products.sort((a, b) => {
    const bayA = a.pick_location[0];
    const bayB = b.pick_location[0];

    // if both bays are not the same length, sort by length
    if (bayA.length !== bayB.length) {
      return bayA.length - bayB.length;
    }

    // else sort by first letter if they are not the same letter
    // if both bays are single char, or if both are double but the first char is not the same, sort by first char
    // localeCompare
    if (bayA.length === 1 || bayA[0] !== bayB[0]) {
      return bayA[0].localeCompare(bayB[0]);
      // else sort by second letter
    } else {
      return bayA[1].localeCompare(bayB[1]);
    }
  });

  return products;
}

function updateProducts(products) {
  const mergedProducts = mergeProducts(products);

  // split pick location string into bay and shelf
  const convertedLocations = mergedProducts.map((product) => {
    product.pick_location = product.pick_location.split(" ");
    return product;
  });

  const sortedByBay = sortProducts(convertedLocations);

  // sort shelf numbers here
  // const sortedByShelf = sortProducts(sortedByBay);

  // join bay and shelf elements back into a string
  const updatedProducts = sortedByBay.map((product) => {
    product.pick_location = product.pick_location.join(" ");
    return product;
  });

  return updatedProducts;
}

module.exports = updateProducts;
