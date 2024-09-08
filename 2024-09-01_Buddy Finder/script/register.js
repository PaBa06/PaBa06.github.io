document.addEventListener("DOMContentLoaded", function() {
    const register_btn = document.getElementById("register_btn_register")

    register_btn.onclick = function(){
        register();
    }

    function register(){
        window.location.href = 'map.html';
    }
})