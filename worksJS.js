window.onload = function() {
    transitionAni();
    no_scroll();
};

function transitionAni() {
    var h = window.innerHeight;

    $(`#move`).animate({
        "top": "-=" + h*3 + "px"
    }, 500,"linear");
}

function clickTop() {
    var div = document.getElementById('move');
    var h = window.innerHeight;
    var w = window.innerWidth;
    div.style.zIndex = 10;
    div.style.position = "absolute";
    div.style.top = -h*3 + "px";
    div.style.right = 0 + "px";
    div.style.left = 0 + "px";
    div.style.height = h*3 + "px";
    div.style.width = w + "px";

    $(`#move`).animate({
        "top": "+=" + h*3 + "px"
    }, 500,"linear").queue(function() {
        window.location.href = "index.html?true"
    });
};

//スクロール禁止用関数
function no_scroll(){
//PC用
var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
$(document).on(scroll_event,function(e){e.preventDefault();});
//SP用
$(document).on('touchmove.noScroll', function(e) {e.preventDefault();});
}

//スクロール復活用関数
function return_scroll(){
//PC用
var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
$(document).off(scroll_event);
//SP用
$(document).off('.noScroll');
}
