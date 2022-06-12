
const botonLogin = document.getElementById("login-button");


botonLogin.addEventListener("click", () => {
    const userInput = document.getElementById("user").value;
    const passwordInput = document.getElementById("password").value;    
    if (userInput == "admin" && passwordInput == "123") {
        location.href = "indexAdmin.html";
    }else{
        document.getElementById("user").classList.add("error");
        document.getElementById("password").classList.add("error");
    }
})

