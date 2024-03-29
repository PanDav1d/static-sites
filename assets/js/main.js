var title = document.getElementsByTagName("title")[0];
var app = document.getElementById("app");
var html = document.getElementsByTagName("html")[0];

function init() {
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        Load(hash);
    } else {
        Load("index");
    }
    LoadNavBar();
    LoadFooter();
}

function LoadNavBar() {
    const navbar = document.getElementById("navbar");
    fetch("/content.json").then(response => response.json()).then(json => {
        navbar.innerHTML = "";
        for (const item of json[0]["navbar"]) {
            if (window.location.hash.substring(1) == item.link) {
                navbar.innerHTML += `<li class='nav-item active'><a class='nav-link' href='#' onclick='Load("${item.link}")'>${item.title}<spanclass='sr-only'></span></a></li>`;
            } else {
                navbar.innerHTML += `<li class='nav-item'><a class='nav-link' href='#' onclick='Load("${item.link}")'>${item.title}<spanclass='sr-only'></span></a></li>`;
            }
        }
    });
}

function LoadFooter(){
    const footer = document.getElementById("footer");
    fetch("/content.json").then(response => response.json()).then(json => {
        footer.innerHTML = "";
        for(const item of json[0]["footer"][0]["links"]){
            footer.innerHTML += `<li class="nav-item"><a class="nav-link px-2 text-muted" onclick='Load("${item.link}");'>${item.title}</a></li>`;
        }
    });
}

function Load(name) {
    // if no value is given assign one
    fetch("/content.json")
        .then(response => response.json())
        .then(json => {
            //collapse the navbar on click
            if (document.getElementById("navbarNavDropdown").classList.contains("show")) {
                document.getElementById("navbarNavDropdown").classList.remove("show");
            }

            for (const item of json[0]["links"]) {
                if (item == name) {
                    fetch("./data/" + item + ".md").then(response => response.text()).then(text => {
                        var converter = new showdown.Converter();
                        var html = converter.makeHtml(text);
                        app.innerHTML = html;
                        window.location.hash = item;
                        document.title = json[0]["website-name"] + " - " + name;
                        LoadNavBar();
                        document.getElementById("navbar-title").innerHTML = json[0]["website-name"];
                    });
                }
                else {
                    app.innerHTML = "<p class='text-center'>Error '" + name + "' not found</p>"
                }
            }





            //check if the page should get cleared or not
            /*
            if (clear) {
                title.innerHTML = json[0]["website-name"] + json[1]["data"][id].title;
                app.innerHTML = html;
            } else {
                title.innerHTML = json[0]["website-name"] + json[1]["data"][id].title;
                app.innerHTML += html;
            }*/
        });
}



