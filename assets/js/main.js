var title = document.getElementsByTagName("title")[0];
var app = document.getElementById("app");
var html = document.getElementsByTagName("html")[0];

function Load(id, clear) {
    fetch("/content.json")
        .then(response => response.json())
        .then(json => {
            if (clear) {
                title.innerHTML = json[0]["website-name"] + json[1]["data"][id].title;
                app.innerHTML = json[1]["data"][id].content;
            } else {
                title.innerHTML = json[0]["website-name"] + json[1]["data"][id].title;
                app.innerHTML += json[1]["data"][id].content;
            }
        });
}