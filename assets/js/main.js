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

            for (const item of json[1]["data"]) {
                if (item.title == name) {
                    fetch("./data/" + item.title + ".md").then(response => response.text()).then(text => {
                        var converter = new showdown.Converter();
                        var html = converter.makeHtml(text);
                        app.innerHTML = html;
                        window.location.hash = item.title;
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



