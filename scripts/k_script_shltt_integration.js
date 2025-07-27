// For this code to work properly, the local storage should be initialised
// with a currentUserId and carts JSON key-value pairs such as shown below:
//    currentUserId:kamel
//    carts:{"kamel":[{"name":"Fresh Strawberries","price":36,"count":1,"imgsrc":"assets/item-cart-04.jpg.webp","product_total":0}]}

// {"kamel":[{"name":"Fresh Strawberries","price":36,"count":1,"imgsrc":"assets/item-cart-04.jpg.webp","product_total":0},{"name":"sngab blabel","price":10,"count":1,"imgsrc":"assets/item-cart-05.jpg.webp","product_total":0}]}

// Get current user ID
var currentUserId = JSON.parse(localStorage.getItem("currentUser")).id;

// Load all carts or initialize
var allCarts = JSON.parse(localStorage.getItem("carts")) || {};
var cart = allCarts[currentUserId] || [];

// Call updateCart initially
updateCart();

function addToCart(imgsrc, name, price, number = 1) {
  var found = false;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].count += number;
      found = true;
      break;
    }
  }
  if (!found) {
    cart.push({ imgsrc: imgsrc, name: name, price: price, count: number });
  }
  saveCart();
  updateCart();
  alert("Item added to cart successfully! 😄 😎");
}

// function addToCart_specific_number(name, price,number) {
//   var found = false;
//   for (var i = 0; i < cart.length; i++) {
//     if (cart[i].name === name) {
//       cart[i].count += number;
//       found = true;
//       break;
//     }
//   }
//   if (!found) {
//     cart.push({ name: name, price: price, count: number });
//   }
//   saveCart();
//   updateCart();
// }

function removeFromCart(index) {
  if (cart[index].count > 1) {
    cart[index].count -= 1;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
  updateCart();
}

function saveCart() {
  allCarts[currentUserId] = cart;
  localStorage.setItem("carts", JSON.stringify(allCarts));
}

function updateCart() {
  var total = 0;
  var total_count = 0;

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    total += item.price * item.count;
    total_count += item.count;

    cart[i].product_total = (item.price * item.count).toFixed(2);
  }
  //the Total price is stored in CartTotalPrice key, and the total product count is stored in CartTotalCount
  localStorage.CartTotalPrice = total;
  localStorage.CartTotalCount = total_count;
}
