/* =========================================
   CANTEENGO — INTERACTIVE FEATURES
   ========================================= */

let cart = [];


/* =========================================
   ELEMENTS
   ========================================= */

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const searchInput = document.getElementById("searchInput");
const foodGrid = document.getElementById("foodGrid");

const categoryButtons = document.querySelectorAll(".category");
const foodCards = document.querySelectorAll(".food-card");

const checkoutButton = document.getElementById("checkoutButton");


/* =========================================
   OPEN CART
   ========================================= */

cartButton.addEventListener("click", function () {
    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";
});


/* =========================================
   CLOSE CART
   ========================================= */

function closeCartPanel() {
    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";
}

closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);


/* =========================================
   ADD TO CART
   ========================================= */

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    // Open cart automatically
    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =========================================
   UPDATE CART
   ========================================= */

function updateCart() {

    // Calculate total number of items
    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    cartCount.textContent = totalItems;


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <div>🛒</div>
                <h3>Your cart is empty</h3>
                <p>
                    Add something delicious from
                    the menu.
                </p>
            </div>
        `;

        cartTotal.textContent = "₹0";

        return;
    }


    // Generate cart items
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-product";

        cartItem.innerHTML = `
            <div style="
                padding: 16px 0;
                border-bottom: 1px solid #eeeeeb;
            ">

                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 15px;
                ">

                    <div>
                        <strong style="
                            font-size: 14px;
                            display: block;
                            margin-bottom: 4px;
                        ">
                            ${item.name}
                        </strong>

                        <span style="
                            color: #888;
                            font-size: 11px;
                        ">
                            ₹${item.price} each
                        </span>
                    </div>

                    <strong style="
                        font-size: 14px;
                    ">
                        ₹${itemTotal}
                    </strong>

                </div>


                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 13px;
                ">

                    <div style="
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    ">

                        <button
                            onclick="changeQuantity(${index}, -1)"
                            style="
                                width: 28px;
                                height: 28px;
                                border: 1px solid #ddd;
                                border-radius: 6px;
                                background: white;
                                cursor: pointer;
                            "
                        >
                            −
                        </button>

                        <span style="
                            font-size: 13px;
                            font-weight: 700;
                            min-width: 15px;
                            text-align: center;
                        ">
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${index}, 1)"
                            style="
                                width: 28px;
                                height: 28px;
                                border: 1px solid #ddd;
                                border-radius: 6px;
                                background: white;
                                cursor: pointer;
                            "
                        >
                            +
                        </button>

                    </div>


                    <button
                        onclick="removeFromCart(${index})"
                        style="
                            border: none;
                            background: transparent;
                            color: #999;
                            font-size: 11px;
                            cursor: pointer;
                        "
                    >
                        Remove
                    </button>

                </div>

            </div>
        `;

        cartItems.appendChild(cartItem);
    });


    // Calculate total price
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `₹${total}`;
}


/* =========================================
   CHANGE QUANTITY
   ========================================= */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}


/* =========================================
   REMOVE FROM CART
   ========================================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


/* =========================================
   SEARCH
   ========================================= */

searchInput.addEventListener("input", function () {

    const searchValue = searchInput.value
        .toLowerCase()
        .trim();

    foodCards.forEach(card => {

        const foodName =
            card.dataset.name.toLowerCase();

        if (foodName.includes(searchValue)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

});


/* =========================================
   CATEGORY FILTER
   ========================================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove active state
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active state
        button.classList.add("active");

        const selectedCategory =
            button.dataset.category;


        foodCards.forEach(card => {

            const cardCategory =
                card.dataset.category;

            if (
                selectedCategory === "all" ||
                cardCategory === selectedCategory
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

});


/* =========================================
   CHECKOUT
   ========================================= */

checkoutButton.addEventListener("click", function () {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add an item first."
        );

        return;
    }


    alert(
        "Checkout system is ready for the next stage!"
    );

});


/* =========================================
   NAVIGATION
   ========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =========================================
   INITIAL STATE
   ========================================= */

updateCart();