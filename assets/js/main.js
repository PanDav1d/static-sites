var title = document.getElementsByTagName("title")[0];
var app = document.getElementById("app");
var html = document.getElementsByTagName("html")[0];

function Load(id, clear) {
    // if no value is given assign one
    if (clear == null) clear = true;
    fetch("/content.json")
        .then(response => response.json())
        .then(json => {
            //collapse the navbar on click
            if (document.getElementById("navbarNavDropdown").classList.contains("show")) {
                document.getElementById("navbarNavDropdown").classList.remove("show");
            }
            //check if the page should get cleared or not
            if (clear) {
                title.innerHTML = json[0]["website-name"] + json[1]["data"][id].title;
                app.innerHTML = json[1]["data"][id].content;
            } else {
                title.innerHTML = json[0]["website-name"] + json[1]["data"][id].title;
                app.innerHTML += json[1]["data"][id].content;
            }
        });
}