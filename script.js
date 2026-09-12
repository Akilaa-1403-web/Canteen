// ==========================================
// FOOD MENU
// ==========================================

const foods = [

    {
        id: 1,
        name: "Idli",
        price: 10,
        category: "breakfast",
        emoji: "🍚",
        description: "Soft idli served with sambar"
    },

    {
        id: 2,
        name: "Dosa",
        price: 15,
        category: "breakfast",
        emoji: "🥞",
        description: "Crispy dosa with chutney"
    },

    {
        id: 3,
        name: "Pongal",
        price: 40,
        category: "breakfast",
        emoji: "🍽️",
        description: "Poori served with potato masala"
    },

    {
        id: 4,
        name: "Veg Meals",
        price: 80,
        category: "lunch",
        emoji: "🍛",
        description: "Complete vegetarian meals"
    },

    {
        id: 5,
        name: "Fried Rice",
        price: 50,
        category: "lunch",
        emoji: "🍚",
        description: "MUshroom fried rice"
    },

    {
        id: 6,
        name: "Veg Noodles",
        price: 50,
        category: "lunch",
        emoji: "🍜",
        description: "Delicious vegetable noodles"
    },

    {
        id: 7,
        name: "Samosa",
        price: 10,
        category: "snacks",
        emoji: "🥟",
        description: "Crispy vegetable samosa"
    },

    {
        id: 8,
        name: "Brownie",
        price: 25,
        category: "snacks",
        emoji: "🍫",
        description: "Creamy brownie"
    },

    {
        id: 9,
        name: "Sandwich",
        price: 30,
        category: "snacks",
        emoji: "🥪",
        description: "Fresh vegetable sandwich"
    },

    {
        id: 10,
        name: "Tea",
        price: 15,
        category: "drinks",
        emoji: "☕",
        description: "Hot tea"
    },

    {
        id: 11,
        name: " Cold Coffee",
        price: 20,
        category: "drinks",
        emoji: "☕",
        description: "Cold coffee"
    },

    {
        id: 12,
        name: "Fresh Juice",
        price: 40,
        category: "drinks",
        emoji: "",
        description: "Fresh fruit juice"
    }

];


// ==========================================
// CART
// ==========================================

let cart = JSON.parse(
    localStorage.getItem("canteenCart")
) || [];


// ==========================================
// DISPLAY FOOD
// ==========================================

function displayFoods(foodList) {

    const container =
        document.getElementById("foodContainer");

    container.innerHTML = "";

    if (foodList.length === 0) {

        container.innerHTML =
            "<p>No food items found.</p>";

        return;
    }

    foodList.forEach(food => {

        const card = document.createElement("div");

        card.className = "food-card";

        card.innerHTML = `

            <div class="food-image">
                ${food.emoji}
            </div>

            <div class="food-info">

                <h3>${food.name}</h3>

                <p>${food.description}</p>

                <div class="price">
                    ₹${food.price}
                </div>

                <button
                    class="add-btn"
                    onclick="addToCart(${food.id})"
                >
                    Add to Cart
                </button>

            </div>
        `;

        container.appendChild(card);

    });
}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(id) {

    const food = foods.find(
        item => item.id === id
    );

    const existingItem = cart.find(
        item => item.id === id
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            id: food.id,
            name: food.name,
            price: food.price,
            emoji: food.emoji,
            quantity: 1

        });

    }

    saveCart();

    updateCartCount();

    alert(food.name + " added to cart!");
}


// ==========================================
// SAVE CART
// ==========================================

function saveCart() {

    localStorage.setItem(
        "canteenCart",
        JSON.stringify(cart)
    );

}


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const count = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    document.getElementById(
        "cartCount"
    ).textContent = count;

}


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

    document.getElementById(
        "cartModal"
    ).style.display = "block";

    displayCart();

}


// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {

    document.getElementById(
        "cartModal"
    ).style.display = "none";

}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        document.getElementById(
            "cartTotal"
        ).textContent = "0";

        return;
    }


    cart.forEach(item => {

        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <div class="cart-item-info">

                <strong>
                    ${item.emoji}
                    ${item.name}
                </strong>

                <p>
                    ₹${item.price} ×
                    ${item.quantity}
                </p>

            </div>


            <div class="quantity-controls">

                <button
                    onclick="changeQuantity(
                        ${item.id}, -1
                    )"
                >
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(
                        ${item.id}, 1
                    )"
                >
                    +
                </button>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(
                        ${item.id}
                    )"
                >
                    🗑
                </button>

            </div>
        `;

        cartItems.appendChild(div);

    });


    calculateTotal();

}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQuantity(id, change) {

    const item = cart.find(
        item => item.id === id
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== id
        );

    }

    saveCart();

    displayCart();

    updateCartCount();

}


// ==========================================
// REMOVE ITEM
// ==========================================

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();

    displayCart();

    updateCartCount();

}


// ==========================================
// CALCULATE TOTAL
// ==========================================

function calculateTotal() {

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    document.getElementById(
        "cartTotal"
    ).textContent = total;

    return total;

}


// ==========================================
// SEARCH FOOD
// ==========================================

function searchFood() {

    const search =
        document.getElementById(
            "searchInput"
        ).value.toLowerCase();

    const filtered =
        foods.filter(food =>
            food.name
                .toLowerCase()
                .includes(search)
        );

    displayFoods(filtered);

}


// ==========================================
// FILTER FOOD
// ==========================================

function filterFood(category) {

    if (category === "all") {

        displayFoods(foods);

        return;
    }

    const filtered =
        foods.filter(
            food =>
                food.category === category
        );

    displayFoods(filtered);

}


// ==========================================
// GO TO ORDER
// ==========================================

function goToOrder() {

    if (cart.length === 0) {

        alert(
            "Please add at least one item to cart."
        );

        return;
    }

    closeCart();

    document.getElementById(
        "order"
    ).scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
function placeOrder() {

    const name = document.getElementById("studentName").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const phone = document.getElementById("phone").value.trim();

    const orderType = document.getElementById("orderType").value;
    const paymentMethod = document.getElementById("paymentMethod").value;

    const pickupTime = document.getElementById("pickupTime").value;
    const deliveryTime = document.getElementById("deliveryTime").value;

    const pickupStatus = document.getElementById("pickupStatus").value;
    const deliveryStatus = document.getElementById("deliveryStatus").value;


    // CHECK CART

    if (cart.length === 0) {
        alert("Please add food items to your cart.");
        return;
    }


    // CHECK NAME

    if (name === "") {
        alert("Please enter your name.");
        return;
    }


    // CHECK STUDENT ID

    if (studentId === "") {
        alert("Please enter your student ID.");
        return;
    }


    // CHECK PHONE

    if (phone === "" || phone.length < 10) {
        alert("Please enter a valid phone number.");
        return;
    }


    // CHECK ORDER TYPE

    if (orderType === "") {
        alert("Please select Pickup or Delivery.");
        return;
    }


    // CHECK PAYMENT

    if (paymentMethod === "") {
        alert("Please select a payment method.");
        return;
    }


    // PICKUP VALIDATION

    if (orderType === "Pickup" && pickupTime === "") {
        alert("Please select pickup time.");
        return;
    }


    // DELIVERY VALIDATION

    if (orderType === "Delivery" && deliveryTime === "") {
        alert("Please select delivery time.");
        return;
    }


    // CREATE ORDER NUMBER

    const orderNumber =
        "CAN" + Math.floor(100000 + Math.random() * 900000);


    // CALCULATE TOTAL

    const total = calculateTotal();


    // ORDER DETAILS

    let details = `
        <strong>Student:</strong> ${name}
        <br><br>

        <strong>Order Type:</strong> ${orderType}
        <br><br>

        <strong>Payment:</strong> ${paymentMethod}
        <br><br>
    `;


    // PICKUP DETAILS

    if (orderType === "Pickup") {

        details += `
            <strong>Pickup Time:</strong> ${pickupTime}
            <br><br>

            <strong>Status:</strong> ${pickupStatus}
            <br><br>
        `;

    }


    // DELIVERY DETAILS

    else {

        details += `
            <strong>Delivery Time:</strong> ${deliveryTime}
            <br><br>

            <strong>Status:</strong> ${deliveryStatus}
            <br><br>
        `;

    }


    // TOTAL

    details += `
        <strong>Total:</strong> ₹${total}
    `;


    // SHOW SUCCESS

    document.getElementById("orderNumber").textContent = orderNumber;

    document.getElementById("orderDetails").innerHTML = details;

    document.getElementById("successModal").style.display = "block";


    // CLEAR CART

    cart = [];

    saveCart();

    updateCartCount();

    displayCart();


    // CLEAR FORM

    document.getElementById("studentName").value = "";

    document.getElementById("studentId").value = "";

    document.getElementById("phone").value = "";

    document.getElementById("orderType").value = "";

    document.getElementById("paymentMethod").value = "";

    document.getElementById("pickupTime").value = "";

    document.getElementById("deliveryTime").value = "";


    // HIDE PICKUP / DELIVERY

    showOrderType();

}

function closeSuccess() {

    document.getElementById(
        "successModal"
    ).style.display = "none";

}


// ==========================================
// INITIAL LOAD
// ==========================================

displayFoods(foods);

updateCartCount();


// ==========================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ==========================================

window.onclick = function(event) {

    const cartModal =
        document.getElementById(
            "cartModal"
        );

    const successModal =
        document.getElementById(
            "successModal"
        );

    if (event.target === cartModal) {

        closeCart();

    }

    if (event.target === successModal) {

        closeSuccess();

    }

};
const orderType = document.getElementById("orderType");
const pickupDetails = document.getElementById("pickupDetails");
const deliveryDetails = document.getElementById("deliveryDetails");

function showOrderType() {

    if (orderType.value === "Pickup") {

        pickupDetails.style.display = "block";
        deliveryDetails.style.display = "none";

    } else if (orderType.value === "Delivery") {

        pickupDetails.style.display = "none";
        deliveryDetails.style.display = "block";

    } else {

        pickupDetails.style.display = "none";
        deliveryDetails.style.display = "none";
    }
}

orderType.addEventListener("change", showOrderType);

showOrderType();