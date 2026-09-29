let cart = [];
let total = 0;

function addPizza(name, price) {

    cart.push(name);
    total = total + price;

    showCart();

}

function showCart() {

    let list = document.getElementById("cartList");

    list.innerHTML = "";

    for (let i = 0; i < cart.length; i++) {
        list.innerHTML += cart[i] + "<br>";
    }

    document.getElementById("total").innerText = total;
}

function buy() {

    if (cart.length == 0) {
        alert("Ostoskori on tyhjä");
    } else {
        alert("Kiitos ostoksesta");
        
        cart = [];
        total = 0;

        showCart();
    }
}