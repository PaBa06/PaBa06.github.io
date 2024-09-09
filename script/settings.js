document.addEventListener("DOMContentLoaded", function() {
    const logout_btn = document.getElementById("settings_btn_logout")
    const delete_acc_btn = document.getElementById("settings_btn_delete-acc");

    //Logout
    logout_btn.onclick = function(){
        logout();
    }

    delete_acc_btn.onclick = function(){
        deleteAcc();
    }

    function logout(){
        window.location.href = 'index.html';
    }

    function deleteAcc(){
        alert("Bitte beachten: Durch das Löschen Ihres Accounts werden alle Ihre Daten dauerhaft entfernt und können nicht wiederhergestellt werden. Möchten Sie wirklich fortfahren?");
    }
})