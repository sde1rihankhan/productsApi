let url = "https://dummyjson.com/carts"
let card = document.querySelector(".manCard");
let apiData = [];
let dropDownFilter
let dataSerchFilter
let disPerFilter
let changeTotalPrice

function prodectCardData(product){
    let cardlist = document.createElement("div")
    cardlist.className = "card"
    let carImage = document.createElement("img")
    let textName = document.createElement("p")
    let textQuantity = document.createElement("p")
    let textPrice = document.createElement("p")
    let textDiscountPer = document.createElement("p")
    let textDiscountTotal = document.createElement("p")
    let textTotal = document.createElement("p")

    
    carImage.className = "carImage"
    textName.className = "textName"
    textQuantity.className = "textQuantity"
    textPrice.className = "textPrice"
    textDiscountPer.className = "textDiscountPer"
    textDiscountTotal.className = "textDiscountTotal"
    textTotal.className = "textTotal"

    carImage.src = product.thumbnail
    textName.innerText = `Name: \u00a0\u00a0-\u00a0\u00a0\u00a0${product.title}`
    textQuantity.innerText = `Quantity: \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0-\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0${product.quantity}`
    textPrice.innerText = `Price: \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0-\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0₹${product.price}`
    textDiscountPer.innerText = `DiscountPersentage: \u00a0-\u00a0\u00a0%${product.discountPercentage}`
    textDiscountTotal.innerText = `DiscountedTotal: \u00a0-\u00a0₹${product.discountedTotal}`
    textTotal.innerText = `Total: \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0-\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0₹${product.discountedTotal}`

    card.appendChild(cardlist)
    cardlist.appendChild(carImage)
    cardlist.appendChild(textName)
    cardlist.appendChild(textQuantity)
    cardlist.appendChild(textPrice)
    cardlist.appendChild(textDiscountPer)
    cardlist.appendChild(textDiscountTotal)
    cardlist.appendChild(textTotal)
}

let getFacts = async()=>{
    let response = await fetch(url)
    console.log(response);
    let data = await response.json()
    console.log(data);
    // apiData = data
    data.carts.forEach((cart)=>{
        cart.products.forEach((product)=>{
            apiData.push(product)
            prodectCardData(product)
        })
    })
}
getFacts()

    function searchProduct(event){
        let item = event.target.value.toUpperCase()
        // if(item === ""){
        //     alert("Enter your product")
        //     return;
        // }
        let dataSerchFilter = apiData.filter((product)=>{
                return product.title.toUpperCase().includes(item)
            });

            if(dataSerchFilter.length === 0){
                let notProduct = document.createElement("p")
                notProduct.className = "notProduct"
                notProduct.innerText = "Product not found"
                card.innerHTML = ""
                card.append(notProduct)
                return
            }
        card.innerHTML = ""
        dataSerchFilter.map((item)=>{
            prodectCardData(item)
        });
    }

function price(event){
    let changePrice = event.target.value
    if(changePrice === "All Price"){
        dropDownFilter = apiData
    }else{
        let [min, max] = changePrice
            .split("-")
            .map(value => Number(value.replace(/,/g, ""))); 
        // let [min,max] = changePrice.split("-").map(Number)
        dropDownFilter = apiData.filter((itemPrice)=>{
            return itemPrice.price >= min && itemPrice.price <= max;
        })
    }
        card.innerHTML = ""
        dropDownFilter.forEach((item)=>{
            prodectCardData(item)
        })
    }

function discountPercentage(event){
    let changeDisPer = event.target.value
    if(changeDisPer === "All Discount Percentage"){
     disPerFilter = apiData
    }else{
        let [min, max] = changeDisPer.split("-")
        .map(value => Number (value.replace(/,/g, "")))
        disPerFilter = apiData.filter((itemDisPer)=>{
            return itemDisPer.discountPercentage >= min && itemDisPer.discountPercentage <= max;
        })
    }
    card.innerHTML = ""
    disPerFilter.forEach((item)=>{
        prodectCardData(item)
    })
}

function total(event){
    let changeTotal = event.target.value
    if(changeTotal === "All Total"){
        changeTotalPrice = apiData
    }else{
        let [min, max] = changeTotal.split("-")
        .map(value => Number (value.replace(/,/g, "")))
        changeTotalPrice = apiData.filter((totalPrice)=>{
            return totalPrice.total >= min && totalPrice.total <= max;
        })
        console.log(changeTotalPrice);
    }
    card.innerHTML = ""
        changeTotalPrice.forEach((item)=>{
            prodectCardData(item)
        })
}