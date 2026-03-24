const params = new URLSearchParams(window.location.search);
const productsParam = params.get("products");

const itemsDiv = document.getElementById("items");
const checkoutBtn = document.getElementById("checkoutBtn");

fetch("products.json")
  .then(res => res.json())
  .then(productMap => {

    let redirectUrl = productMap["default"];

    if (productsParam) {
      const entries = productsParam.split(",");

      entries.forEach(entry => {
        const [id, qty] = entry.split(":");
        const quantity = parseInt(qty) || 1;

        const div = document.createElement("div");
        div.className = "item";
        div.textContent = `${id} (Qty: ${quantity})`;
        itemsDiv.appendChild(div);

        // Use first valid product as checkout link
        if (productMap[id] && redirectUrl === productMap["default"]) {
          redirectUrl = productMap[id];
        }
      });
    }

    checkoutBtn.href = redirectUrl;

  })
  .catch(() => {
    checkoutBtn.href = "/";
  });
