const product = [
    {
        id: 0,
        name: "PANIPURI",
        price: 45,
        qnty: 1,
        image: "assets/img/11.jpeg"
    },

    {
        id: 1,
        name: "PIZZA",
        price: 225,
        qnty: 1,
        image: "assets/img/pizza.jpg"
    },

    {
        id: 2,
        name: "PLAIN DHOSA",
        price: 75,
        qnty: 1,
        image: "assets/img/dr.avif"
    },

    {
        id: 3,
        name: "MASALA DHOSA",
        price: 105,
        qnty: 1,
        image: "assets/img/c.avif"
    },

    {
        id: 4,
        name: "PANEER CHILLI",
        price: 125,
        qnty: 1,
        image: "assets/img/images.jfif"
    },

    {
        id: 5,
        name: "VADAPAV",
        price: 40,
        qnty: 1,
        image: "assets/img/vada.jpg"
    },

    {
        id: 6,
        name: "NOODLES",
        price: 70,
        qnty: 1,
        image: "assets/img/noodle.webp"
    },

    {
        id: 7,
        name: "BURGER",
        price: 99,
        qnty: 1,
        image: "assets/img/burger.avif"
    },
];

const viewcarttttt = () => {
    var tbl = "";

    product.map((val) => {
        return (
            tbl += `
            <div class="col-3 p-2">
            <div class="card">
               <div class="img">
               <p style = "display : none;">${val.id}</p>
                <img src="${val.image}" class="img-fluid" alt="">
               </div>
               <h3>${val.name}</h3>
               <span>RS.${val.price}</span>
               <button onclick ="addcart(${val.id})">
                <i class="fa-solid fa-cart-shopping"></i>
               </button>
            </div>
        </div>
        `
        )
    })
    document.getElementById("fiesta").innerHTML = tbl;


}
viewcarttttt();

let cart = [];
const addcart = (id) => 
{
    let allcart = JSON.parse(localStorage.getItem('cart')) ?
        JSON.parse(localStorage.getItem('cart')) : [];

    let dupcart = allcart.find((item) => {
        return item.id == id;
    })
    if (dupcart) 
    {
        alert('Items already exist....!');
        return false;
    }

    if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === undefined) 
    {
        product.map((item) => {
            if (item.id == id) 
            {
                cart.push(item);
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart));

    } 
    else 
    {
        let old = JSON.parse(localStorage.getItem("cart"));
        product.map((item) => {
            if (item.id == id) 
            {
                old.push(item);
            }
        })
        localStorage.setItem("cart", JSON.stringify(old));

    }
    alert("Product added on cart..");
    viewcarttttt();
    viewcart();
}


const viewcart = () => {
    let allcart = JSON.parse(localStorage.getItem("cart"));
    let tbl = "";
    let sum = 0;
    allcart.map((val) => {
        sum = sum + (val.price * val.qnty);
        return (
            tbl += `
            <div class="col-12 d-flex justify-content-center align-items-center"  style = " border-top: 1px solid #333333; padding : 10px 0">
            <div class="col-4">
            <div style = "display : none;">${val.id}</div>
                <div class="img">
                    <img src="${val.image} " alt="">
                </div>
            </div>
            <div class="col-4 d-flex justify-content-center" >
                <div class="title">
                    <h2>${val.name}</h2>
                    <p>RS.${val.price}</p>
                    <span ><input onchange="editcart(${val.id}) " id="qty_${val.id}" style = "width : 50%; padding-left : 10px;" type = "number" value = "${val.qnty}" /></span>
                     </div>
            </div>
            <div class="col-4">
                <div class="iconD d-flex justify-content-center">
                    <p>RS.${val.price * val.qnty} </p>
                    <i onclick = "DeleteItem(${val.id})" class="fa-solid fa-trash"></i>
                   </div>
            </div>
        </div>
                    `
        )
    })
    document.getElementById("cartItem").innerHTML = tbl;
    document.getElementById("FinalTotal").innerHTML = `RS.${sum}`;

    let count = allcart.length;
    document.getElementById("count").innerHTML = count;
    viewcarttttt();

}
viewcart();

const DeleteItem = (id) => {
    let allCarts = JSON.parse(localStorage.getItem("cart"));

    let deletI = allCarts.filter((val) => {
        return val.id != id;

    })
    localStorage.setItem("cart", JSON.stringify(deletI))

    alert("Items Deleted...");
    viewcart();
}

const editcart = (id) => {
    let qnty = document.getElementById(`qty_${id}`).value;
    let allcart = JSON.parse(localStorage.getItem(`cart`));

    allcart.map((item) => {
        if (item.id == id) 
        {
            item.qnty = qnty;
        }
    })
    localStorage.setItem("cart", JSON.stringify(allcart));
    alert("sucessfully updated...");
    viewcart();
}






