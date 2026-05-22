// ================================
// PRODUCT DETAILS PAGE
// frontend/js/product.js
// ================================


// ================================
// PRODUCT QUANTITY
// ================================

const minusBtn = document.getElementById(
    "minus-btn"
);

const plusBtn = document.getElementById(
    "plus-btn"
);

const quantityText = document.getElementById(
    "quantity"
);

// Default Quantity
let quantity = 1;


// Increase Quantity
if(plusBtn){

    plusBtn.addEventListener("click", () => {

        quantity++;

        quantityText.innerText = quantity;

    });

}


// Decrease Quantity
if(minusBtn){

    minusBtn.addEventListener("click", () => {

        if(quantity > 1){

            quantity--;

            quantityText.innerText = quantity;

        }

    });

}


// ================================
// ADD PRODUCT TO CART
// ================================

const addCartBtn = document.querySelector(
    ".add-cart-btn"
);

if(addCartBtn){

    addCartBtn.addEventListener(
        "click",
        () => {

            // Product Data
            const product = {

                id:Date.now(),

                name:document.querySelector(
                    ".product-content h2"
                ).innerText,

                price:parseInt(
                    document.querySelector(
                        ".product-detail-price"
                    ).innerText.replace(
                        "Rs. ",
                        ""
                    )
                ),

                image:document.querySelector(
                    ".product-image img"
                ).src,

                quantity:quantity

            };

            // Get Cart
            let cart = JSON.parse(
                localStorage.getItem("cart")
            ) || [];

            // Check Existing Product
            const existingProduct = cart.find(
                (item) =>
                    item.name === product.name
            );

            // Increase Quantity
            if(existingProduct){

                existingProduct.quantity +=
                    quantity;

            }

            else{

                // Add Product
                cart.push(product);

            }

            // Save Cart
            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            alert(
                "Product Added To Cart"
            );

            // Update Cart Count
            updateCartCount();

        }
    );

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

    // Get Cart
    const cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    let totalQuantity = 0;

    // Count Total Products
    cart.forEach((item) => {

        totalQuantity += item.quantity;

    });

    // Show Count
    cartCount.innerText = totalQuantity;

}


// ================================
// BUY NOW BUTTON
// ================================

const buyNowBtn = document.querySelector(
    ".buy-now-btn"
);

if(buyNowBtn){

    buyNowBtn.addEventListener(
        "click",
        () => {

            // Redirect
            window.location.href =
                "checkout.html";

        }
    );

}


// ================================
// CALL FUNCTION
// ================================

updateCartCount();