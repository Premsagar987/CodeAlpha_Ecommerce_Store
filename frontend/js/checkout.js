// ================================
// CHECKOUT SYSTEM
// ================================


// ================================
// GET CART
// ================================

function getCart(){

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


// ================================
// DISPLAY ORDER SUMMARY
// ================================

function displayCheckoutSummary(){

    const summaryContainer = document.querySelector(
        ".checkout-summary"
    );

    // Stop If Page Not Found
    if(!summaryContainer){
        return;
    }

    const cart = getCart();

    let subtotal = 0;

    let summaryHTML = `

        <h3>
            Order Summary
        </h3>

    `;

    // Show Products
    cart.forEach((product) => {

        subtotal +=
            product.price * product.quantity;

        summaryHTML += `

            <div class="summary-item">

                <span>
                    ${product.name}
                    (${product.quantity})
                </span>

                <span>
                    Rs. ${product.price * product.quantity}
                </span>

            </div>

        `;

    });

    // Shipping
    const shipping = 100;

    // Total
    const total = subtotal + shipping;

    // Final Total
    summaryHTML += `

        <div class="summary-item">

            <span>
                Shipping
            </span>

            <span>
                Rs. ${shipping}
            </span>

        </div>


        <div class="summary-item total">

            <span>
                Total
            </span>

            <span>
                Rs. ${total}
            </span>

        </div>

    `;

    // Show Summary
    summaryContainer.innerHTML =
        summaryHTML;

}


// ================================
// PLACE ORDER
// ================================

const checkoutForm = document.querySelector(
    ".checkout-form form"
);

if(checkoutForm){

    checkoutForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            // Get Inputs
            const inputs =
                checkoutForm.querySelectorAll(
                    "input, textarea"
                );

            let isEmpty = false;

            // Check Empty Fields
            inputs.forEach((input) => {

                if(input.value.trim() === ""){

                    isEmpty = true;

                }

            });

            // Validation
            if(isEmpty){

                alert(
                    "Please Fill All Fields"
                );

                return;

            }

            // Success Message
            alert(
                "Order Placed Successfully"
            );

            // Clear Cart
            localStorage.removeItem("cart");

            // Redirect
            window.location.href =
                "index.html";

        }
    );

}


// ================================
// CALL FUNCTION
// ================================

displayCheckoutSummary();