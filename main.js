function closeBanner(name) {
    alert(name);
}

function loadProduct() {
    alert(window.location.search)
}

var cartItems = new Array();

function addToCart() {
    var sku = document.getElementsByName("sku")[0].value;

    var sizes = document.getElementsByName("size");
    var size;

    for (i = 0; i < sizes.length; i++) {
        if (sizes[i].checked) {
            size = sizes[i].value;
            break;
        }
    }

    var colors = document.getElementsByName("color");
    var color;

    for (i = 0; i < colors.length; i++) {
        if (colors[i].checked) {
            color = colors[i].value;
            break;
        }
    }

    itemId = sku + "-00-" + color + "-" + size

    cartItems.push(itemId);
    alert(cartItems);


    localStorage.setItem("cart", JSON.stringify(cartItems))

    alert(itemId)



    return false;
}