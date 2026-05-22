// ================================
// MAIN JS FILE
// frontend/js/main.js
// ================================

console.log("MAIN JS LOADED");


// ================================
// NAVBAR SCROLL EFFECT
// ================================

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(
        ".navbar"
    );

    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    }

    else{

        navbar.classList.remove("scrolled");

    }

});


// ================================
// DARK MODE TOGGLE
// ================================

const themeToggle = document.getElementById(
    "theme-toggle"
);

if(themeToggle){

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );

        }
    );

}


// ================================
// HERO SLIDER
// ================================

const slides = document.querySelectorAll(
    ".slide"
);

let currentSlide = 0;

function changeSlide(){

    // Stop If No Slides
    if(slides.length === 0){
        return;
    }

    // Remove Current Slide
    slides[currentSlide].classList.remove(
        "active-slide"
    );

    currentSlide++;

    // Restart Slider
    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    // Add Active Slide
    slides[currentSlide].classList.add(
        "active-slide"
    );

}


// Auto Slide
if(slides.length > 0){

    setInterval(changeSlide,4000);

}


// ================================
// PRODUCT FILTER
// ================================

const filterButtons = document.querySelectorAll(
    ".filter-btn"
);

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove Active Class
        filterButtons.forEach((btn) => {

            btn.classList.remove(
                "active-filter"
            );

        });

        // Add Active Class
        button.classList.add(
            "active-filter"
        );

        // Get Filter
        const filter = button.getAttribute(
            "data-filter"
        );

        // Product Cards
        const productCards =
            document.querySelectorAll(
                ".product-card"
            );

        // Filter Products
        productCards.forEach((card) => {

            if(filter === "all"){

                card.style.display = "block";

            }

            else if(
                card.classList.contains(filter)
            ){

                card.style.display = "block";

            }

            else{

                card.style.display = "none";

            }

        });

    });

});


// ================================
// FETCH PRODUCTS
// ================================

async function fetchProducts(){

    try{

        // Fetch Products
        const response = await fetch(
            "http://localhost:5000/api/products"
        );

        // Convert To JSON
        const products = await response.json();

        // Product Container
        const productContainer =
            document.getElementById(
                "product-container"
            );

        // Stop If Container Missing
        if(!productContainer){
            return;
        }

        // Empty Container
        productContainer.innerHTML = "";

        // Loop Products
        products.forEach((product) => {

            productContainer.innerHTML += `

                <div class="product-card">

                    <img src="${product.image}"
                         alt="${product.name}">


                    <div class="product-info">

                        <h3>
                            ${product.name}
                        </h3>

                        <p class="product-price">
                            Rs. ${product.price}
                        </p>

                        <p class="product-description">
                            ${product.description}
                        </p>

                        <button class="add-to-cart">
                            Add To Cart
                        </button>

                    </div>

                </div>

            `;

        });

    }

    catch(error){

        console.log(
            "Error Fetching Products"
        );

        console.log(error);

    }

}


// ================================
// MOBILE MENU
// ================================

const menuToggle = document.querySelector(
    ".menu-toggle"
);

const navLinks = document.querySelector(
    ".nav-links"
);

if(menuToggle){

    menuToggle.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "show-menu"
            );

        }
    );

}


// ================================
// PASSWORD SHOW / HIDE
// ================================

const passwordIcons =
    document.querySelectorAll(
        ".password-box i"
    );

passwordIcons.forEach((icon) => {

    icon.addEventListener("click", () => {

        const passwordInput =
            icon.previousElementSibling;

        // Toggle Password
        if(passwordInput.type === "password"){

            passwordInput.type = "text";

            icon.classList.remove(
                "fa-eye"
            );

            icon.classList.add(
                "fa-eye-slash"
            );

        }

        else{

            passwordInput.type = "password";

            icon.classList.remove(
                "fa-eye-slash"
            );

            icon.classList.add(
                "fa-eye"
            );

        }

    });

});


// ================================
// NEWSLETTER FORM
// ================================

const newsletterForm =
    document.querySelector(
        ".newsletter-form"
    );

if(newsletterForm){

    newsletterForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            alert(
                "Subscribed Successfully"
            );

            newsletterForm.reset();

        }
    );

}


// ================================
// CALL FUNCTION
// ================================

fetchProducts();