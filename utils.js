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
  const convertedProducts = products.map((product) => {
    product.pick_location = product.pick_location.split(" ");
    return product;
  });

  convertedProducts.sort((a, b) => {
    const bayA = a.pick_location[0];
    const bayB = b.pick_location[0];
    const shelfA = a.pick_location[1];
    const shelfB = b.pick_location[1];

    if (bayA === bayB) return shelfA - shelfB;

    if (bayA.length !== bayB.length) {
      return bayA.length - bayB.length;
    }

    if (bayA.length === 1 || bayA[0] !== bayB[0]) {
      return bayA[0].localeCompare(bayB[0]);
    } else if (bayA[1] !== bayB[1]) {
      return bayA[1].localeCompare(bayB[1]);
    }
  });

  const sortedProducts = convertedProducts.map((product) => {
    product.pick_location = product.pick_location.join(" ");
    return product;
  });

  return sortedProducts;
}

function updateProducts(products) {
  const mergedProducts = mergeProducts(products);
  const updatedProducts = sortProducts(mergedProducts);
  return updatedProducts;
}

module.exports = updateProducts;
