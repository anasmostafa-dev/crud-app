//call inputs
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

//get total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
        total.innerHTML = result; 
        total.style.background = 'green';
        
    }else{
        total.innerHTML = '';
        total.style.background = '#740000';
        
    }
}


//creat product

let creatPro;
if(localStorage.product != null && localStorage.product != ""){
    creatPro = JSON.parse(localStorage.product);
}else{
    creatPro = [];
} 
submit.onclick = function(){
    let objPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value != '' && price.value != '' && category.value != '' && objPro.count < 100){
       if(mood === 'create'){
        if(+objPro.count > 1){
            for(let i = 0; i < objPro.count; i++){
                creatPro.push(objPro);
            }
        }else{
            creatPro.push(objPro);
        }clearData();
    }else{
        creatPro[ tmp ] = objPro;
        mood = 'create'
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    } 
    }
    
    

//save localstorage     
    localStorage.setItem('product',  JSON.stringify(creatPro));
    
    showData();
}



//clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}



//read

function showData(){
    getTotal();
    let table = '';
    for(let i = 0; i < creatPro.length; i++){
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${creatPro[i].title}</td>
            <td>${creatPro[i].price}</td>
            <td>${creatPro[i].taxes}</td>
            <td>${creatPro[i].ads}</td>
            <td>${creatPro[i].discount}</td>
            <td>${creatPro[i].total}</td>
            <td>${creatPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deletPro(${i})" id="Delete">Delete</button></td>
        </tr>
        ` 
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(creatPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="DeleteAll()">Delete All (${creatPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = '';
    }
}
    showData();
    


//delete

function deletPro(i){
    creatPro.splice(i, 1);
    localStorage.product = JSON.stringify(creatPro);
    showData()
}


//delete all

function DeleteAll(){
    localStorage.clear();
    creatPro.splice(0);
    showData()
}



//count
//up   ^


//update

function updateData(i){

    title.value = creatPro[i].title;
    price.value = creatPro[i].price;
    taxes.value = creatPro[i].taxes;
    ads.value = creatPro[i].ads;
    discount.value = creatPro[i].discount;
    getTotal();
    category.value = creatPro[i].category;
    submit.innerHTML = 'Update' 
    count.style.display = 'none'
    mood = 'update';
    tmp = i;
    scroll({
        top : 0,
        behavior:"smooth",
    })
}



//search

let searchMood = 'title'


function getsearchMood(id){
    let search = document.getElementById('search');
    if( id === 'bytitle'){
        searchMood = 'Title';
        
    }else{
        searchMood = 'Category';
        
    }
    search.placeholder = 'Search By '+ searchMood ;
    search.focus();
    search.value = '';
    showData();
    
}

function searchData(value){
    let table = '';
    for(let i = 0; i < creatPro.length; i++){
        if( searchMood == 'title'){
                if(creatPro[i].title.includes(value.toLowerCase())){
                    table += `
                            <tr>
                                <td>${i + 1}</td>
                                <td>${creatPro[i].title}</td>
                                <td>${creatPro[i].price}</td>
                                <td>${creatPro[i].taxes}</td>
                                <td>${creatPro[i].ads}</td>
                                <td>${creatPro[i].discount}</td>
                                <td>${creatPro[i].total}</td>
                                <td>${creatPro[i].category}</td>
                                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                                <td><button onclick="deletPro(${i})" id="Delete">Delete</button></td>
                            </tr>
                            ` 
                }
        }else{
            
                if(creatPro[i].category.includes(value.toLowerCase())){
                    table += `
                            <tr>
                                <td>${i + 1}</td>
                                <td>${creatPro[i].title}</td>
                                <td>${creatPro[i].price}</td>
                                <td>${creatPro[i].taxes}</td>
                                <td>${creatPro[i].ads}</td>
                                <td>${creatPro[i].discount}</td>
                                <td>${creatPro[i].total}</td>
                                <td>${creatPro[i].category}</td>
                                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                                <td><button onclick="deletPro(${i})" id="Delete">Delete</button></td>
                            </tr>
                            ` 
                }
            
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

//clean data