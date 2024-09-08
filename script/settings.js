document.addEventListener("DOMContentLoaded", function() {
    const logout_btn = document.getElementById("settings_btn_logout")

    //Logout
    logout_btn.onclick = function(){
        logout();
    }

    function logout(){
        window.location.href = 'index.html';
    }
})