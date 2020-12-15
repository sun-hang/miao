function loadScript() {
    //创建script标签，并设置src属性添加到body中
    var script = document.createElement("script");
    script.id = "tmap-script";
    script.type = "text/javascript";
    script.src = "https://map.qq.com/api/gljs?v=1.exp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&callback=initMap";
    document.body.appendChild(script);
}
export function tMapInit() {
    window.onload = loadScript;
}

export function showMap() {
    loadScript();
}

export function remove(){
    document.querySelector("#tmap-script")?.remove();
}