document.addEventListener("DOMContentLoaded", function(){
    const btn_show_filter_tabs = document.getElementById("home_btn_show_filter_tabs");
    const home_filter_tabs  = document.getElementById("home-filter-tabs");

    btn_show_filter_tabs.addEventListener("click", function(){
        if(home_filter_tabs.style.display === "none") {
            home_filter_tabs.style.display = "flex";
        } else {
            home_filter_tabs.style.display = "none";
        }
    })
})