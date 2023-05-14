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

function sortProducts(unsortedProducts) {
  // calc mid index of array
  const mid =
    unsortedProducts.length % 2 === 0
      ? unsortedProducts.length / 2
      : (unsortedProducts.length - 1) / 2;

  const sortedProducts = [unsortedProducts[mid]];
  let newMid = 0;

  // sort left half
  for (let i = 0; i < mid; i++) {
    const bay = unsortedProducts[i].pick_location[0];
    if (bay.length === 1) {
      if (bay[0] > unsortedProducts[mid].pick_location[0]) {
        sortedProducts.push(unsortedProducts[i]);
      } else {
        sortedProducts.unshift(unsortedProducts[i]);
        newMid++;
      }
    } else {
      if (bay[1] > unsortedProducts[mid].pick_location[0][1]) {
        sortedProducts.push(unsortedProducts[i]);
      } else {
        sortedProducts.unshift(unsortedProducts[i]);
        newMid++;
      }
    }
  }

  // sort right half
  for (let i = mid + 1; i < unsortedProducts.length; i++) {
    const bay = unsortedProducts[i].pick_location[0];
    if (bay.length > 1) {
      if (bay[0] > unsortedProducts[mid].pick_location[0]) {
        sortedProducts.push(unsortedProducts[i]);
      } else {
        sortedProducts.unshift(unsortedProducts[i]);
        newMid++;
      }
    } else {
      if (bay[1] > unsortedProducts[mid].pick_location[0][1]) {
        sortedProducts.push(unsortedProducts[i]);
      } else {
        sortedProducts.unshift(unsortedProducts[i]);
        newMid++;
      }
    }
  }

  if (unsortedProducts.length > 2) {
    return [
      ...sortProducts(sortedProducts.slice(0, newMid)),
      ...sortProducts(sortedProducts.slice(newMid)),
    ];
  }

  return sortedProducts;
}

function updateProducts(products) {
  const mergedProducts = mergeProducts(products);

  // split pick locations into bay and shelves and convert bay letters to ASCII
  const convertedLocations = mergedProducts.map((product) => {
    product.pick_location = product.pick_location.split(" ");
    product.pick_location[0] = product.pick_location[0]
      .split("")
      .map((letter) => {
        return letter.charCodeAt();
      });
    return product;
  });

  // sort into bays A - Z and bays AA = AZ
  const singleLetterBays = [];
  const doubleLetterBays = [];

  for (let i = 0; i < convertedLocations.length; i++) {
    if (convertedLocations[i].pick_location[0].length === 1) {
      singleLetterBays.push(convertedLocations[i]);
    } else {
      doubleLetterBays.push(convertedLocations[i]);
    }
  }

  const sortedByBay = [];

  if (singleLetterBays.length > 0) {
    sortedByBay.push(...sortProducts(singleLetterBays));
  }

  if (doubleLetterBays.length > 0) {
    sortedByBay.push(...sortProducts(doubleLetterBays));
  }

  // sort shelf numbers here
  // const sortedByShelf = sortProducts(sortedByBay);

  // convert ASCII codes back to letters
  const updatedProducts = sortedByShelf.map((product) => {
    product.pick_location[0] = product.pick_location[0].map((letter) => {
      return String.fromCharCode(letter);
    });
    product.pick_location[0] = product.pick_location[0].join("");
    product.pick_location = product.pick_location.join(" ");
    return product;
  });

  return updatedProducts;
}

module.exports = updateProducts;
