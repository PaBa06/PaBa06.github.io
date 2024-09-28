document.addEventListener("DOMContentLoaded", function() {
    const login_btn = document.getElementById("index_btn_login")

    //Login
    login_btn.onclick = function(){
        login();
    }

    function login(){
        window.location.href = 'home.html';
    }
})