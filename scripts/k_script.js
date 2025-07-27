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

function addToCart(name, price) {
  var found = false;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].count += 1;
      found = true;
      break;
    }
  }
  if (!found) {
    cart.push({ name: name, price: price, count: 1 });
  }
  saveCart();
  updateCart();
}

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
  var cartItemsDiv = document.querySelector('tbody');
  var subtotalspan = document.querySelector(".k_subtotal_amount");
  var totalspan = document.querySelector('.k_total_amount');
  cartItemsDiv.innerHTML = '';
  var total = 0;
  var total_count = 0;

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    total += item.price * item.count;
    total_count += item.count;

    var table_row = document.createElement('tr');

    table_row.innerHTML = `
    <tr>
      <td colspan="2">
        <div class="k_product_image_text">
          <div class="k_product_image"> 
            <img src="${item.imgsrc}" class="k_img" alt="">
          </div>
          <span>${item.name}</span>
        </div>
      </td>
      <td>$ ${parseFloat(item.price).toFixed(2)}</td>
      <td>
        <div class="k_I_D_div">
          <button class="k_I_D_Buttons" onclick="removeFromCart(${i})">-</button>
          <span class="k_product_quantity_span">${item.count}</span>
          <button class="k_I_D_Buttons" onclick="addToCart('${item.name}',${item.price})">+</button></td>
        </div>
      <td>$ ${(item.price * item.count).toFixed(2)}</td>
    </tr>
    `
       
    cartItemsDiv.appendChild(table_row);
    cart[i].product_total = (item.price * item.count).toFixed(2)
    //setitem total price for each element and total total
  }

  subtotalspan.innerHTML= `$${total.toFixed(2)}`;
  totalspan.innerHTML = '$' + total.toFixed(2);
  
  //the Total price is stored in CartTotalPrice key, and the total product count is stored in CartTotalCount
  localStorage.CartTotalPrice= total;
  localStorage.CartTotalCount= total_count;
}
