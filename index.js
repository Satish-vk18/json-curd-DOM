let container = document.createElement("div");
let url = "https://automatic-dog-aardwolf.glitch.me/products";

let titleInput = document.getElementById("title");
let priceInput = document.getElementById("price");
let categoryInput = document.getElementById("category")
let idInput = document.getElementById("id");

let btn = document.getElementById("btn");

btn.addEventListener("click", async function(){
    if(titleInput.value == '' || priceInput.value == '' || categoryInput.value == ''){
        alert("Enter full Data");
    }
    else{
        let method = idInput.value ? "PUT" : "POST";
        let mainurl = method == "PUT" ? `${url}/${idInput.value}` : `${url}`;
        try{
            let response = await fetch(mainurl , {
                method,
                "headers" : {
                    "Content-Type" : "application/json"
                },
                "body" : JSON.stringify({
                    "title" : titleInput.value,
                    "price" : priceInput.value,
                    "category" : categoryInput.value,
                })
            })
            if(response.ok){
                getData();
                alert((method == "PUT" ? "Data Updated" : "Data Added"));
            }
    }
    catch(err){
        console.error(err);
    }
    }
})

async function getData() {
   try{
    let response = await fetch(url);
    if(response.ok){
        let data = await response.json()
        displayData(data)   
    }
   }
   catch(err){
    console.error(err)
   }
}

function displayData(products){
    container.innerHTML=``;
    products.forEach(Obj => {
        let item = document.createElement("div");
        item.innerHTML = `
        <p>${Obj.title}</p>
        <p>${Obj.price}</p>
        <p>${Obj.category}</p>
        <button onclick = "deleteData('${Obj.id}')"> Delete </button> 
        <button onclick = updateData('${Obj.id}')> Update </button>
        `;
        container.appendChild(item)
    });
    document.body.appendChild(container);
}

async function updateData(id) {
    try{
        let response = await fetch(`${url}/${id}`);
        let obj = await response.json();
        titleInput.value = obj.title;
        priceInput.value = obj.price;
        categoryInput.value = obj.category;
        idInput.value = obj.id;
        window.scroll({
            top : 0,
            behavior : "smooth"
        })
    }catch(err){
        console.error(err);
    }
}

async function deleteData(id) {
    try{
        let response = await fetch(`${url}/${id}`,{"method" : "DELETE"});
        if(response.ok){
            getData();
            alert("Data Deleted");
        }
    }
    catch(err){
        console.error(err);
    }
}
getData();