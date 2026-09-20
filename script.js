/* =========================================
   CANTEENGO — ORDERING SYSTEM
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
const foodCards = document.querySelectorAll(".food-card");

const categoryButtons = document.querySelectorAll(".category");

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

    const existingItem =
        cart.find(item => item.name === name);

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

    /*
       IMPORTANT:
       We DO NOT open the cart here.

       User can continue adding
       multiple food items.
    */

}


/* =========================================
   UPDATE CART
   ========================================= */

function updateCart() {

    let totalItems = 0;
    let totalPrice = 0;


    cart.forEach(item => {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;

    });


    cartCount.textContent = totalItems;

    cartTotal.textContent =
        `₹${totalPrice}`;


    /* EMPTY CART */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <div>🛒</div>

                <h3>Your cart is empty</h3>

                <p>
                    Add something delicious
                    from the menu.
                </p>

            </div>
        `;

        return;
    }


    /* CART ITEMS */

    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-product";


        cartItem.innerHTML = `

            <div style="
                padding: 16px 0;
                border-bottom: 1px solid #eeeeeb;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    gap:15px;
                ">

                    <div>

                        <strong style="
                            display:block;
                            font-size:14px;
                            margin-bottom:4px;
                        ">
                            ${item.name}
                        </strong>

                        <span style="
                            color:#888;
                            font-size:11px;
                        ">
                            ₹${item.price} each
                        </span>

                    </div>


                    <strong>
                        ₹${itemTotal}
                    </strong>

                </div>


                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-top:13px;
                ">

                    <div style="
                        display:flex;
                        align-items:center;
                        gap:10px;
                    ">

                        <button
                            onclick="changeQuantity(${index}, -1)"
                            style="
                                width:28px;
                                height:28px;
                                border:1px solid #ddd;
                                border-radius:6px;
                                background:white;
                            "
                        >
                            −
                        </button>


                        <span style="
                            min-width:15px;
                            text-align:center;
                            font-weight:700;
                            font-size:13px;
                        ">
                            ${item.quantity}
                        </span>


                        <button
                            onclick="changeQuantity(${index}, 1)"
                            style="
                                width:28px;
                                height:28px;
                                border:1px solid #ddd;
                                border-radius:6px;
                                background:white;
                            "
                        >
                            +
                        </button>

                    </div>


                    <button
                        onclick="removeFromCart(${index})"
                        style="
                            border:none;
                            background:none;
                            color:#999;
                            font-size:11px;
                        "
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });

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
   REMOVE ITEM
   ========================================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =========================================
   SEARCH
   ========================================= */

searchInput.addEventListener(
    "input",
    function () {

        const value =
            searchInput.value
            .toLowerCase()
            .trim();


        foodCards.forEach(card => {

            const name =
                card.dataset.name
                .toLowerCase();


            if (name.includes(value)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    }
);


/* =========================================
   CATEGORY FILTER
   ========================================= */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            categoryButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            const category =
                button.dataset.category;


            foodCards.forEach(card => {

                const cardCategory =
                    card.dataset.category;


                if (
                    category === "all" ||
                    cardCategory === category
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        }
    );

});


/* =========================================
   PLACE ORDER
   ========================================= */

checkoutButton.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add food items first."
            );

            return;

        }


        openCheckout();

    }
);


/* =========================================
   CHECKOUT SCREEN
   ========================================= */

function openCheckout() {

    closeCartPanel();


    const checkoutScreen =
        document.createElement("div");


    checkoutScreen.id =
        "checkoutScreen";


    checkoutScreen.innerHTML = `

        <div class="checkout-container">

            <button
                class="checkout-back"
                onclick="closeCheckout()"
            >
                ← Back to menu
            </button>


            <div class="checkout-header">

                <span class="section-label">
                    CHECKOUT
                </span>

                <h1>
                    Complete your
                    <span>order.</span>
                </h1>

                <p>
                    Choose your pickup time and
                    payment method.
                </p>

            </div>


            <div class="checkout-grid">


                <!-- ORDER SUMMARY -->

                <div class="checkout-card">

                    <h2>Order summary</h2>

                    <div
                        id="checkoutItems"
                        class="checkout-items"
                    ></div>


                    <div class="checkout-total">

                        <span>Total</span>

                        <strong id="checkoutTotal">
                            ₹0
                        </strong>

                    </div>

                </div>


                <!-- ORDER DETAILS -->

                <div class="checkout-card">

                    <h2>Pickup details</h2>


                    <label>
                        Pickup time
                    </label>


                    <select id="pickupTime">

                        <option value="">
                            Select pickup time
                        </option>

                        <option>
                            12:30 PM – 12:45 PM
                        </option>

                        <option>
                            12:45 PM – 1:00 PM
                        </option>

                        <option>
                            1:00 PM – 1:15 PM
                        </option>

                        <option>
                            1:15 PM – 1:30 PM
                        </option>

                        <option>
                            1:30 PM – 1:45 PM
                        </option>

                    </select>


                    <label>
                        Payment method
                    </label>


                    <div class="payment-options">

                        <label class="payment-option">

                            <input
                                type="radio"
                                name="payment"
                                value="upi"
                            >

                            <span>
                                UPI
                            </span>

                        </label>


                        <label class="payment-option">

                            <input
                                type="radio"
                                name="payment"
                                value="cash"
                            >

                            <span>
                                Pay at canteen
                            </span>

                        </label>

                    </div>


                    <button
                        class="place-order-button"
                        onclick="confirmOrder()"
                    >
                        Place Order
                    </button>

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(checkoutScreen);


    renderCheckoutItems();

}


/* =========================================
   CHECKOUT ITEMS
   ========================================= */

function renderCheckoutItems() {

    const container =
        document.getElementById(
            "checkoutItems"
        );


    const totalElement =
        document.getElementById(
            "checkoutTotal"
        );


    let total = 0;


    container.innerHTML = "";


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        container.innerHTML += `

            <div class="checkout-item">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <span>
                        Qty ${item.quantity}
                    </span>

                </div>

                <strong>
                    ₹${itemTotal}
                </strong>

            </div>

        `;

    });


    totalElement.textContent =
        `₹${total}`;

}


/* =========================================
   CONFIRM ORDER
   ========================================= */

function confirmOrder() {

    const pickup =
        document.getElementById(
            "pickupTime"
        ).value;


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if (!pickup) {

        alert(
            "Please select a pickup time."
        );

        return;

    }


    if (!payment) {

        alert(
            "Please select a payment method."
        );

        return;

    }


    const orderNumber =
        Math.floor(
            1000 + Math.random() * 9000
        );


    const paymentText =
        payment.value === "upi"
            ? "UPI"
            : "Pay at Canteen";


    document.getElementById(
        "checkoutScreen"
    ).innerHTML = `

        <div class="order-success">

            <div class="success-icon">
                ✓
            </div>


            <span class="section-label">
                ORDER CONFIRMED
            </span>


            <h1>
                Your order is
                <span>confirmed.</span>
            </h1>


            <p>
                Order #CG${orderNumber}
                has been placed successfully.
            </p>


            <div class="success-card">

                <div>
                    <span>
                        Pickup time
                    </span>

                    <strong>
                        ${pickup}
                    </strong>
                </div>


                <div>
                    <span>
                        Payment
                    </span>

                    <strong>
                        ${paymentText}
                    </strong>
                </div>

            </div>


            <button
                class="back-home-button"
                onclick="finishOrder()"
            >
                Back to Menu
            </button>

        </div>

    `;


    cart = [];

    updateCart();

}


/* =========================================
   CLOSE CHECKOUT
   ========================================= */

function closeCheckout() {

    const screen =
        document.getElementById(
            "checkoutScreen"
        );


    if (screen) {

        screen.remove();

    }

}


/* =========================================
   FINISH ORDER
   ========================================= */

function finishOrder() {

    closeCheckout();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   INITIALIZE
   ========================================= */

updateCart();