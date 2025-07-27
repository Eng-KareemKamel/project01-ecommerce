// loadLayout.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("sh_header").innerHTML = html;
    });

  fetch("footer.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("m_footer").innerHTML = html;
    });
});

window.addEventListener("scroll", function () {
  const target = document.querySelector("#sh_header");
  if (window.scrollY > 300) {
    target.classList.add("dark_bg");
  } else {
    target.classList.remove("dark_bg");
  }
});

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
