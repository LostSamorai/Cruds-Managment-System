var btnLogin=document.getElementById("btnLogin");
var inputEmail=document.getElementById("inputEmail");
var inputPassword=document.getElementById("inputPassword");

btnLogin.addEventListener("click",function(){
 checkLogin(inputEmail,inputPassword);
});
//this login function will replace user and pass with dinamic code from database 
//but now we are in test cycle
function checkLogin(user,pass){
    user=inputEmail.value;
    pass=inputPassword.value;
    if(user==="admin@test.com"&pass==="admin1234"){
        console.log("Admin success");
        //redirect to admin managment system
        window.location(adminManagmentSystem.html);
    }
    else if(user==="user@test.com"&pass==="user1234"){
        console.log("User success");
        //redirect to User store system 
    }
    else{
        alert("Check your Email or Password ...!")
    }
}

