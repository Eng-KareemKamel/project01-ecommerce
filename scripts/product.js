const sh_searchBtn = document.querySelector(".sh_searchBtn");
const sh_searchInput = document.querySelector(".sh_search");
const sh_search = document.querySelector(".sh_search Input");
const noResults = document.getElementById("noResults");
let data = []; // Initialize data array
var i = 0;
var qty = 1;
// ================================search bar===============
sh_searchBtn.addEventListener("click", () => {
  sh_searchInput.classList.toggle("show");
});

// ================================fetsh data===============
(async function () {
  try {
    const res = await fetch("product.json"); // fetch JSON file
    const text = await res.text(); // get raw text
    data = JSON.parse(text); // manually parse

    const container = document.getElementById("sh_productGrid");

    data.forEach((product, index) => {
      container.innerHTML += `
            <div class="product col-md-3 col-sm-6 col-xs-12">
            <div class="product_img">
                <img src="${product.Images[0].secure_url}" alt="${
        product.title
      }">
                <a href="#" class="sh_quick_Access">Quick Access</a>
            </div>
            <div class="product_info">
                <div>
                <a class="sh_title" href="#">${product.title}</a>
                <p>$${product.price.toFixed(2)}</p>
                </div>
                <button class="add_to_cart" onclick="addToCart('${
                  product.Images[0].secure_url
                }','${product.title}', ${product.price.toFixed(
        2
      )},1)">🛒</button>
            </div>
            </div>
        `;
    });
  } catch (err) {
    console.error("Error fetching JSON:", err);
  }
})();

// ============================== search========================
sh_search.addEventListener("keyup", function () {
  const searchTerm = sh_search.value.toLowerCase();
  const products = document.querySelectorAll(".product");

  let visibleCount = 0;

  products.forEach((product) => {
    const title = product.querySelector(".sh_title").textContent.toLowerCase();

    if (searchTerm === "" || title.includes(searchTerm)) {
      product.style.display = "block";
      visibleCount++;
    } else {
      product.style.display = "none";
    }
  });

  // Show "no results" only if no products are visible
  noResults.style.display = visibleCount === 0 ? "block" : "none";
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("sh_quick_Access")) {
    e.preventDefault();
    const index = Array.from(
      document.querySelectorAll(".sh_quick_Access")
    ).indexOf(e.target);
    console.log("Quick Access clicked for product index:", index);

    sh_showModal(data[index]);
  }
});

function sh_showModal(sh_product) {
  qty = 1; // reset quantity on modal open
  document.getElementById("sh_mainImage").src = sh_product.Images[0].secure_url;

  const sh_thumbContainer = document.getElementById("sh_thumbContainer");
  sh_thumbContainer.innerHTML = "";
  sh_product.Images.forEach((img) => {
    sh_thumbContainer.innerHTML += `
      <img src="${img.secure_url}" onclick="document.getElementById('sh_mainImage').src='${img.secure_url}'" />
    `;
  });

  const sh_modalInfo = document.getElementById("sh_modalInfo");
  const sh_sizeOptions = sh_product.size
    .map((size) => `<option value="${size}">${size}</option>`)
    .join("");
  const sh_colorOptions = sh_product.colors
    .map((color) => `<option value="${color}">${color}</option>`)
    .join("");

  sh_modalInfo.innerHTML = `
    <h2>${sh_product.title}</h2>
    <p><strong>${sh_product.price.toFixed(2)}$</strong></p>
    <p class="m-t">${sh_product.desc}</p>

    <label for="sh_modalSize">Size:</label>
    <select id="sh_modalSize">
      <option class="sh_placeHold" value="">Choose an Option</option>
      ${sh_sizeOptions}
    </select>
<br/>
    <label for="sh_modalColor">Color:</label>
    <select id="sh_modalColor">
      <option class="sh_placeHold" value="">Choose an Option</option>
      ${sh_colorOptions}
    </select>

    <div class="sh_quantity_controls">
      <button id="sh_decreaseQty">−</button>
      <span id="sh_quantityValue">1</span>
      <button id="sh_increaseQty">+</button>
    </div>

    <button id="sh_addToCartBtn">ADD TO CART</button>
  `;

  document.getElementById("sh_quantityValue").textContent = qty;

  document.getElementById("sh_decreaseQty").onclick = decrement_qty;
  document.getElementById("sh_increaseQty").onclick = increment_qty;

  document.getElementById("sh_addToCartBtn").onclick = () => {
    addToCart(
      sh_product.Images[0].secure_url,
      sh_product.title,
      sh_product.price.toFixed(2),
      qty
    );
  };

  document.getElementById("sh_productModal").style.display = "flex";
}

document.getElementById("sh_closeModal").onclick = () => {
  document.getElementById("sh_productModal").style.display = "none";
};
function decrement_qty() {
  qty = Math.max(1, qty - 1);
  document.getElementById("sh_quantityValue").textContent = qty;
}
function increment_qty() {
  qty++;
  document.getElementById("sh_quantityValue").textContent = qty;
}

// ============================================
// window.addEventListener("scroll", function () {
//   const navbar = document.getElementById("sh_header");
//   if (window.scrollY > 50) {
//     navbar.classList.add("navbar-scrolled");
//   } else {
//     navbar.classList.remove("navbar-scrolled");
//   }
// });

// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", function () {
  const body = document.getElementById("pageBody");
  const toggleButton = document.getElementById("darkModeToggle");

  // Check and apply saved mode
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
  }

  toggleButton.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    // Save to localStorage
    const mode = body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", mode);
  });
});

// ====================================================

let lastCartLength = 0;

function updateCartCountIfChanged() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return;

  const allCarts = JSON.parse(localStorage.getItem("carts")) || {};
  const userCart = allCarts[currentUser.id] || [];
  const newLength = userCart.length || 0;

  // Only update if changed
  if (newLength !== lastCartLength) {
    document.querySelector("#shopping-icon span").textContent = newLength;
    lastCartLength = newLength;
  }
}

// Check every 1 second (1000 ms)
setInterval(updateCartCountIfChanged, 300);

// Also run once immediately
updateCartCountIfChanged();
