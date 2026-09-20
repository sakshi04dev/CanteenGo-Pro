/* =========================================
   CANTEENGO — COMPLETE ORDER SYSTEM
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


closeCart.addEventListener(
    "click",
    closeCartPanel
);


cartOverlay.addEventListener(
    "click",
    closeCartPanel
);


/* =========================================
   ADD TO CART
   ========================================= */

function addToCart(name, price) {

    const existing =
        cart.find(item => item.name === name);


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }


    updateCart();

}


/* =========================================
   UPDATE CART
   ========================================= */

function updateCart() {

    let itemCount = 0;
    let total = 0;


    cart.forEach(item => {

        itemCount += item.quantity;

        total +=
            item.price * item.quantity;

    });


    cartCount.textContent =
        itemCount;


    cartTotal.textContent =
        `₹${total}`;


    /* EMPTY */

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div>🛒</div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add something delicious
                    from the menu.
                </p>

            </div>

        `;

        return;

    }


    /* ITEMS */

    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        const element =
            document.createElement("div");


        element.innerHTML = `

            <div style="
                padding:16px 0;
                border-bottom:1px solid #eeeeeb;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:flex-start;
                ">

                    <div>

                        <strong style="
                            display:block;
                            font-size:14px;
                        ">
                            ${item.name}
                        </strong>

                        <span style="
                            color:#999;
                            font-size:11px;
                        ">
                            ₹${item.price} each
                        </span>

                    </div>


                    <strong style="
                        font-size:14px;
                    ">
                        ₹${itemTotal}
                    </strong>

                </div>


                <div style="
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    margin-top:12px;
                ">


                    <div style="
                        display:flex;
                        align-items:center;
                        gap:10px;
                    ">


                        <button
                            onclick="changeQuantity(${index}, -1)"
                            style="
                                width:30px;
                                height:30px;
                                border:1px solid #ddd;
                                background:white;
                                border-radius:6px;
                            "
                        >
                            −
                        </button>


                        <strong>
                            ${item.quantity}
                        </strong>


                        <button
                            onclick="changeQuantity(${index}, 1)"
                            style="
                                width:30px;
                                height:30px;
                                border:1px solid #ddd;
                                background:white;
                                border-radius:6px;
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


        cartItems.appendChild(element);

    });


    /* MAKE SURE CHECKOUT BUTTON EXISTS */

    createCheckoutButton();

}


/* =========================================
   CREATE CHECKOUT BUTTON
   ========================================= */

function createCheckoutButton() {

    const footer =
        document.querySelector(".cart-footer");


    if (!footer) {
        return;
    }


    footer.innerHTML = `

        <div class="cart-total">

            <span>
                Total
            </span>

            <strong id="cartTotal">
                ₹${calculateTotal()}
            </strong>

        </div>


        <button
            id="checkoutButton"
            class="checkout-button"
        >
            Proceed to checkout
        </button>

    `;


    document
        .getElementById("checkoutButton")
        .addEventListener(
            "click",
            openCheckout
        );

}


/* =========================================
   CALCULATE TOTAL
   ========================================= */

function calculateTotal() {

    let total = 0;


    cart.forEach(item => {

        total +=
            item.price * item.quantity;

    });


    return total;

}


/* =========================================
   QUANTITY
   ========================================= */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


/* =========================================
   REMOVE
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


            card.style.display =
                name.includes(value)
                    ? ""
                    : "none";

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


            const selected =
                button.dataset.category;


            foodCards.forEach(card => {

                const category =
                    card.dataset.category;


                if (
                    selected === "all" ||
                    selected === category
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
   OPEN CHECKOUT
   ========================================= */

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Please add at least one item."
        );

        return;

    }


    closeCartPanel();


    const old =
        document.getElementById(
            "checkoutScreen"
        );


    if (old) {
        old.remove();
    }


    const screen =
        document.createElement("div");


    screen.id =
        "checkoutScreen";


    screen.innerHTML = `

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
                    Review your order,
                    choose pickup time
                    and select payment.
                </p>

            </div>



            <div class="checkout-grid">


                <!-- ORDER SUMMARY -->

                <div class="checkout-card">

                    <h2>
                        Order summary
                    </h2>


                    <div
                        id="checkoutItems"
                        class="checkout-items"
                    ></div>


                    <div class="checkout-total">

                        <span>
                            Total
                        </span>


                        <strong
                            id="checkoutTotal"
                        >
                            ₹0
                        </strong>

                    </div>

                </div>



                <!-- PAYMENT / PICKUP -->

                <div class="checkout-card">

                    <h2>
                        Pickup & Payment
                    </h2>


                    <label>
                        Pickup time
                    </label>


                    <select
                        id="pickupTime"
                    >

                        <option value="">
                            Select pickup time
                        </option>

                        <option>
                            12:30 PM – 12:50 PM
                        </option>

                        <option>
                            12:50 PM – 1:10 PM
                        </option>

                        <option>
                            1:10 PM – 1:30 PM
                        </option>

                        <option>
                            1:30 PM – 1:50 PM
                        </option>

                        <option>
                            1:50 PM – 2:10 PM
                        </option>

                    </select>


                    <label>
                        Payment method
                    </label>


                    <div class="payment-options">


                        <label
                            class="payment-option"
                        >

                            <input
                                type="radio"
                                name="payment"
                                value="upi"
                            >

                            <span>
                                UPI
                            </span>

                        </label>


                        <label
                            class="payment-option"
                        >

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


    document.body.appendChild(screen);


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


    container.innerHTML = "";


    let total = 0;


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


    const paymentName =
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
                        ${paymentName}
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
   FINISH
   ========================================= */

function finishOrder() {

    closeCheckout();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   SMOOTH NAVIGATION
   ========================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                const id =
                    this.getAttribute(
                        "href"
                    );


                if (id === "#") {
                    return;
                }


                const target =
                    document.querySelector(id);


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


/* =========================================
   START
   ========================================= */

updateCart();