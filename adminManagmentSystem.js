// alert("connected ..!")
var inputProductName=document.getElementById("inputProductName");
var inputProductPrice=document.getElementById("inputProductPrice");
var inputProductCategory=document.getElementById("inputProductCategory");
var inputProductDescription=document.getElementById("inputProductDescription");
var inputSearch=document.getElementById("inputSearch");
var btnSave=document.getElementById("btnSave");
var btnUpdate=document.getElementById("btnUpdate");
var productList=[]
var tempData =-1;

nonOverWriteAtLocalStorgeData();
DisplayProduct();


function nonOverWriteAtLocalStorgeData(){
    if(localStorage.getItem("store")!=null){
        productList= JSON.parse(localStorage.getItem("store"));
    }
}
btnSave.addEventListener("click",addProduct);

btnUpdate.addEventListener("click",function(){
    if(sessionStorage.getItem("tempUpdateData")!=-1){
        tempData= sessionStorage.getItem("tempUpdateData");
        var data=typeof(parseInt(sessionStorage.getItem("tempUpdateData")));
        confirmUpadteData(tempData);
    }
});
inputSearch.addEventListener("input",SearchProduct);
function addProduct(){
   var product={
        name:inputProductName.value,
        price:inputProductPrice.value,
        category:inputProductCategory.value,
        description:inputProductDescription.value
    }
    productList.push(product);
    clearInputs();
    localStorage.setItem("store",JSON.stringify(productList));
    DisplayProduct();
}
function DisplayProduct(){
    var setterData=``;
    nonOverWriteAtLocalStorgeData();
    for(var i=0; i<productList.length;i++){
        setterData+=` <tr>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].description}</td>
        <td>
            <button onclick="updateData(${i})" class="btn btn-outline-warning">Update</button>
        </td>
        <td>
            <button  onclick="deleteProduct(${i})"class="btn btn-outline-danger"id ='btnDelete'>Delete</button>
        </td>
    </tr>`;
    }
    document.getElementById("table-data").innerHTML=setterData;
}
//update data
function updateData(index){
    for(var i=0; i<productList.length;i++){
        if(i==index){
            inputProductName.value=productList[i].name;
            inputProductPrice.value=productList[i].price;
            inputProductCategory.value=productList[i].category;
            inputProductDescription.value=productList[i].description;
            btnUpdate.classList.add("d-flex");
            btnSave.classList.add("d-none");
            btnUpdate.classList.remove("d-none");
           tempData=i;
           sessionStorage.setItem("tempUpdateData",tempData);
           
        } 
        
    }
}
function confirmUpadteData(index){  
    for(var i=0; i<productList.length;i++){
        if(index==i){
            productList[i].name=inputProductName.value;
            productList[i].price=inputProductPrice.value;
            productList[i].category=inputProductCategory.value;
            productList[i].description=inputProductDescription.value;
        }
    }
    localStorage.setItem("store",JSON.stringify(productList));
    DisplayProduct();
    clearInputs();
    btnSave.classList.add("d-flex");
    btnSave.classList.remove("d-none");
    btnUpdate.classList.add("d-none");
    tempData=0;
    
}
function SearchProduct(){
    var setterData=``;
    for(var i=0; i<productList.length;i++){
        if(productList[i].name.toLowerCase().includes(inputSearch.value.toLowerCase())==true)
        {
            setterData+=` <tr>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].description}</td>
            <td>
                <button onclick="updateData(${i})" class="btn btn-outline-warning">Update</button>
            </td>
            <td>
                <button onclick="deleteProduct(${i})"class="btn btn-outline-danger">Delete</button>
            </td>
        </tr>`;
        }
    }
    document.getElementById("table-data").innerHTML=setterData; 

}
function deleteProduct(index){
productList.splice(index,1);
localStorage.setItem("store",JSON.stringify(productList));
DisplayProduct();
}
function clearInputs(){
    inputProductName.value="";
    inputProductPrice.value="";
    inputProductCategory.value="";
    inputProductDescription.value="";
}