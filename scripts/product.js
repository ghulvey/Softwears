const productsJSON = `{
    "198472": {
        "sku": 198472,
        "name": "Product Name",
        "category": "Example",
        "tags": [],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisis magna etiam tempor orci eu. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Massa tincidunt nunc pulvinar sapien.",
        "msrp": 39.99,
        "discount": 29.99,
        "flag": "Sale",
        "release": "",
        "images": [],
        "sizes": ["XS", "S", "M", "L", "XL", "2X", "3X"],
        "colors": ["Red", "Blue", "Black"],
        "notes": ""
    },
    "192456": {
        "sku": 192456,
        "name": "Hovertron",
        "category": "Hovertron",
        "tags": [],
        "description": "The ultimate mobility device",
        "msrp": 319.99,
        "discount": 299.99,
        "flag": "Preorder",
        "release": "2020-5-12",
        "images": ["images/hovertron/85162390-child-on-hover-board-kids-riding-scooter-in-summer-park-balance-board-for-children-electric-self-bal.jpg", "images/hovertron/hoverboard-safety.jpg", "images / hovertron / tmg - article_default_mobile.jpg"],
        "sizes": ["Adult", "Child"],
        "colors": ["Red", "Blue", "Black", "Green", "Pink"],
        "notes": ""
    }
}`;
Vue.component("rectangular-radio", {
    props: ['value'],
    template: '<input type="radio" id="S" name="size" value="S"> <label for = "S" > S < /label>'
});

function dateToString(dateIn) {
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var day = weekdays[dateIn.getDay()];
    var date = dateIn.getDate();
    var month = months[dateIn.getMonth()];

    var lastone = +date.toString().split('').pop();
    var suffix;
    if (lastone > 3 || lastone == 0) {
        suffix = "th";
    } else if (lastone == 1) {
        suffix = "st";
    } else if (lastone == 2) {
        suffix = "nd";
    } else if (lastone == 3) {
        suffix = "rd";
    }



    return day + ", " + month + " " + date + suffix
}

function calcShippingTimes(releaseString) {
    var departueDate;

    //Convert JSON date to JavaScript
    var release = new Date(releaseString);

    //Get Todays Date
    var today = new Date();

    //If a release date is not past use it as the departure date otherwise use today
    if (release != null || "") {
        if (release > today) {
            departueDate = release;
        } else {
            departueDate = today;
        }
    } else {
        departueDate = today;
    }

    //Calculate Arrival Dates
    var expressArrival = new Date(departueDate)
    expressArrival.setDate(expressArrival.getDate() + 2);

    var standardArrival = new Date(departueDate)
    standardArrival.setDate(standardArrival.getDate() + 5);

    var standard = dateToString(standardArrival)
    var express = dateToString(expressArrival)

    return {
        standard: standard,
        express: express
    }


}


window.onload = function productView(event) {

    //Get the values in the URL
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);

    //Parse the url
    const sku = urlParams.get('sku')
    const size = urlParams.get('size')
    const color = urlParams.get('color')

    //Prepare values in products to be processed
    var productParse = JSON.parse(productsJSON);

    //Determine the flag color 
    var flagCat;
    if (productParse[sku].flag != (null || "") && (productParse[sku].flag == "Sale" || productParse[sku].flag == "Preorder")) {
        flagCat = productParse[sku].flag.toLowerCase()
    } else if (productParse[sku].flag != (null || "")) {
        flagCat = "limited"
    }

    //Calculate Shipping Times
    shipingTimes = calcShippingTimes(productParse[sku].release);
    console.log(shipingTimes.standard)

    //Variables to be injected into products.html 
    var app = new Vue({
        el: '#product-app',
        data: {
            sku: sku,
            sizeUrl: size,
            colorUrl: color,
            name: productParse[sku].name,
            flag: productParse[sku].flag,
            flagCat: flagCat,
            msrp: "$" + productParse[sku].msrp,
            price: "$" + productParse[sku].discount,
            description: productParse[sku].description,
            sizes: productParse[sku].sizes,
            colors: productParse[sku].colors,
            images: productParse[sku].images,
            expressShip: shipingTimes.express,
            standardShip: shipingTimes.standard
        }
    })
}