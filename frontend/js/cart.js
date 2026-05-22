// ================================
// CART SYSTEM
// frontend/js/cart.js
// ================================


// ================================
// GET CART FROM LOCAL STORAGE
// ================================

function getCart(){

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


// ================================
// SAVE CART
// ================================

function saveCart(cart){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ================================
// ADD TO CART
// ================================

function addToCart(product){

    let cart = getCart();

    // Check Product Exists
    const existingProduct = cart.find(
        (item) => item.id === product.id
    );

    // Increase Quantity
    if(existingProduct){

        existingProduct.quantity += 1;

    }

    else{

        // Add New Product
        cart.push({
            ...product,
            quantity:1
        });

    }

    // Save Cart
    saveCart(cart);

    // Update Count
    updateCartCount();

    alert("Product Added To Cart");

}


// ================================
// UPDATE CART COUNT
// ================================

function updateCartCount(){

    const cartCount = document.querySelector(
        ".cart-count"
    );

    if(!cartCount){
        return;
    }

    const cart = getCart();

    let totalQuantity = 0;

    cart.forEach((item) => {

        totalQuantity += item.quantity;

    });

    cartCount.innerText = totalQuantity;

}


// ================================
// DISPLAY CART ITEMS
// ================================

function displayCartItems(){

    const cartItems = document.getElementById(
        "cart-items"
    );

    // Stop If Cart Page Not Found
    if(!cartItems){
        return;
    }

    const cart = getCart();

    // Empty Container
    cartItems.innerHTML = "";

    let totalPrice = 0;

    // Empty Cart
    if(cart.length === 0){

        cartItems.innerHTML = `

            <h2 class="empty-cart">
                Cart Is Empty
            </h2>

        `;

        return;

    }

    // Show Products
    cart.forEach((product,index) => {

        totalPrice += product.price * product.quantity;

        cartItems.innerHTML += `

            <div class="cart-item">

                <!-- Image -->
                <img src="${product.image}"
                     alt="${product.name}">


                <!-- Details -->
                <div class="cart-details">

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="cart-price">
                        Rs. ${product.price}
                    </p>


                    <!-- Quantity -->
                    <div class="quantity-box">

                        <button onclick="decreaseQuantity(${index})">
                            -
                        </button>

                        <span>
                            ${product.quantity}
                        </span>

                        <button onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>

                </div>


                <!-- Remove -->
                <button class="remove-btn"
                        onclick="removeItem(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        `;

    });

    // Update Total
    const cartTotal = document.getElementById(
        "cart-total"
    );

    if(cartTotal){

        cartTotal.innerText =
            `Rs. ${totalPrice + 100}`;

    }

}


// ================================
// REMOVE ITEM
// ================================

function removeItem(index){

    let cart = getCart();

    cart.splice(index,1);

    saveCart(cart);

    displayCartItems();

    updateCartCount();

}


// ================================
// INCREASE QUANTITY
// ================================

function increaseQuantity(index){

    let cart = getCart();

    cart[index].quantity++;

    saveCart(cart);

    displayCartItems();

    updateCartCount();

}


// ================================
// DECREASE QUANTITY
// ================================

function decreaseQuantity(index){

    let cart = getCart();

    // Minimum 1
    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }

    saveCart(cart);

    displayCartItems();

    updateCartCount();

}


// ================================
// ADD BUTTON EVENT
// ================================

const addCartButtons = document.querySelectorAll(
    ".add-to-cart"
);

addCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Product Card
        const productCard = button.closest(
            ".product-card"
        );

        // Product Data
        const product = {

            id:Date.now(),

            name:productCard.querySelector(
                "h3"
            ).innerText,

            price:parseInt(
                productCard.querySelector(
                    ".product-price"
                ).innerText.replace("Rs. ","")
            ),

            image:productCard.querySelector(
                "img"
            ).src

        };

        // Add Product
        addToCart(product);

    });

});


// ================================
// CALL FUNCTIONS
// ================================

updateCartCount();

displayCartItems();