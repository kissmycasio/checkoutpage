const params = new URLSearchParams(window.location.search);
const productsParam = params.get("products");

fetch("products.json")
  .then(res => res.json())
  .then(productMap => {

    let redirectUrl = productMap["default"];

    if (productsParam) {
      const firstProduct = productsParam.split(",")[0];
      const productId = firstProduct.split(":")[0];

      if (productMap[productId]) {
        redirectUrl = productMap[productId];
      }
    }

    // slight delay so loading screen is visible (~700ms)
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 700);

  })
  .catch(() => {
    window.location.href = "/";
  });
