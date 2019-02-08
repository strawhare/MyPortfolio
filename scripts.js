var num = 0;
var isHoleScaling = false;
window.onload = function() {
    console.log("asdfg");
    no_scroll()
    var url = location.href;
    var parameters = url.split("?");
    var param = parameters[1];
    if (param){
        backedAni();
    }else{
        createHare();
    }
};

function holeAni() {
    document.getElementById('hole').addEventListener("click", function() {
        if (isHoleScaling){return false};
        isHoleScaling = true;
        $('#footprint').fadeOut(1000).queue(function() {
            this.remove();
        });
        $('#holeImg').animate({paddingRight:1},{
    	//2秒かけてアニメーション
    	duration:2000,
    	//stepは、アニメーションが進むたびに呼ばれる
    	step:function(now){
            var now1 = now*2.5-1;
            //三次関数を用いてscaleを変化させる
    		$('#holeImg').css({transform:'scale(' + (((1.4*now1*now1*now1-0.8*now1-0.6)+1.2)*5+1) + ')'});
    	},
    	//終わったら
    	complete:function(){

            appendWallInit();
            appendWall();
            createItems();
            createAlice();
            setTimeout(function () {
                $('#holeImg').fadeOut(1000).queue(function() {
                    $(`#hole`).remove();
                });
            },500)
    	}
    })
    },false);
}

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


function createFootPrint() {
    $('#footprintImg').fadeIn(1000);
};

function walk() {
    $("#leftFootImg").fadeIn(700);
    $("#leftFootImg").fadeOut(700)
    setTimeout(function() {
        $("#rightFootImg").fadeIn(700);
        $("#rightFootImg").fadeOut(700)
    },1400);
}

function createHare() {
    var num = 2;
    $('#hare').fadeIn(400);
    $('#hare').fadeOut(400, function(){
        document.getElementById('hareImg').src =
        `./images/hare${num}.png`;
        num++;
    });
    var mv = function() {
        $('#hare').fadeIn(400);
        $('#hare').fadeOut(400, function(){
            document.getElementById('hareImg').src =
            `./images/hare${num}.png`;
            num++;
            if (num > 6) {
                setTimeout(function() {
                    walk();
                },1000);
                clearInterval(mvTimer)
                setTimeout(function() {
                    document.getElementById('hare').parentNode.removeChild(document.getElementById('hare'));
                    $('#holeImg').fadeIn(1000);
                    createFootPrint();
                    holeAni();
                },4000);
                return false;
            };
        });
    };
    var mvTimer = setInterval(function(){
        mv();
    }, 1000);
};

function createAlice() {
    $("#alice").show();
    rect("#alice",3200);
};

function createItems() {
        $("#clock").show();
        $("#pot").show();
        $("#trump").show();
        rect("#clock",3200);
        rect("#pot", 3200);
        rect("#trump",3200);
        transition();
};

function rect(name) {
    first = Math.floor( Math.random() * (100-50) + 50);
    second = Math.floor( Math.random() * (100-50) + 50);
    time = Math.floor( Math.random() * (4000-2000) + 2000);
    $(name).animate({
        marginTop: `-=${first}px`
    }, time/2).animate({
        marginTop: `+=${first}px`
    }, time/2);
    $(name).animate({
        marginTop: `-=${second}px`
    }, time/2).animate({
        marginTop: `+=${second}px`
    }, time/2);
    setTimeout(`rect("${name}")`,time);
}

function appendWall() {
    //動的にDiv要素を生成する
    var div = document.createElement('div');
    div.setAttribute("id", `${num}`);
    div.style.zIndex = -1
    var h = window.innerHeight;
    var w = window.innerWidth;

    div.style.backgroundColor = "white";
    div.style.position = "absolute";
    div.style.top = h + "px";
    div.style.height = h + "px";
    div.style.right = w/10 + "px";
    div.style.width = w*4/5 + "px";
    var rightImg = document.createElement('img');
    rightImg.style.position = "absolute";
    rightImg.src = "images/wall_right.png";
    rightImg.style.height = h + "px";
    rightImg.style.right = 0 + "px";
    //Divにイメージを組み込む
    div.appendChild(rightImg);
    var leftImg = document.createElement('img');
    leftImg.style.position = "absolute";
    leftImg.src = "images/wall_left.png";
    leftImg.style.height = h + "px";
    leftImg.style.left = 0 + "px";
    //Divにイメージを組み込む
    div.appendChild(leftImg);
    //Divを組み込む
    initial.appendChild(div);
    up();
    num += 1;
    setTimeout('appendWall()',1800);
};

function appendWallInit() {
    document.bgColor = "#000";
    var div = document.createElement('div');
    div.setAttribute("id", `-1`);
    div.style.zIndex = -1
    var h = window.innerHeight;
    var w = window.innerWidth;

    div.style.backgroundColor = "white";
    div.style.position = "absolute";
    div.style.top = h + "px";
    div.style.height = h + "px";
    div.style.right = w/10 + "px";
    div.style.width = w*4/5 + "px";
    var rightImg = document.createElement('img');
    rightImg.style.position = "absolute";
    rightImg.src = "images/wall_right.png";
    rightImg.style.height = h + "px";
    rightImg.style.right = 0 + "px";
    //Divにイメージを組み込む
    div.appendChild(rightImg);
    var leftImg = document.createElement('img');
    leftImg.style.position = "absolute";
    leftImg.src = "images/wall_left.png";
    leftImg.style.height = h + "px";
    leftImg.style.left = 0 + "px";
    //Divにイメージを組み込む
    div.appendChild(leftImg);
    //Divを組み込む
    initial.appendChild(div);
    $(`#-1`).animate({
        "top": "-=" + h*2 + "px"
    }, 6000,"linear").queue(function() {
        this.remove();
    });


    var div = document.createElement('div');
    div.setAttribute("id", `0`);
    div.style.zIndex = -1
    var h = window.innerHeight;
    var w = window.innerWidth;

    div.style.backgroundColor = "white";
    div.style.position = "absolute";
    div.style.top = 0 + "px";
    div.style.height = h + "px";
    div.style.right = w/10 + "px";
    div.style.width = w*4/5 + "px";
    var rightImg = document.createElement('img');
    rightImg.style.position = "absolute";
    rightImg.src = "images/wall_right.png";
    rightImg.style.height = h + "px";
    rightImg.style.right = 0 + "px";
    //Divにイメージを組み込む
    div.appendChild(rightImg);
    var leftImg = document.createElement('img');
    leftImg.style.position = "absolute";
    leftImg.src = "images/wall_left.png";
    leftImg.style.height = h + "px";
    leftImg.style.left = 0 + "px";
    //Divにイメージを組み込む
    div.appendChild(leftImg);
    //Divを組み込む
    initial.appendChild(div);
    $(`#0`).animate({
        "top": "-=" + h*2 + "px"
    }, 6000,"linear").queue(function() {
        this.remove();
    });
}

function up() {
    var divH = window.innerHeight;
    $(`#${num}`).animate({
        "top": "-=" + divH*2 + "px"
    }, 6000,"linear").queue(function() {
        this.remove();
    });
};

function transition() {
    document.getElementById('clock').addEventListener("click", function() {
        console.log("a");
        $('.mainClass').css('pointer-events', 'none');
        transitionAni("works.html");
    },false);
    document.getElementById('trump').addEventListener("click", function() {
        console.log("b");
        $('.mainClass').css('pointer-events', 'none');
        transitionAni("about.html");
    },false);
    document.getElementById('pot').addEventListener("click", function() {
        console.log("c");
        $('.mainClass').css('pointer-events', 'none');
        transitionAni("contact.html");
    },false);
}

function transitionAni(url) {
    var div = document.getElementById('transition');
    var h = window.innerHeight;
    var w = window.innerWidth;
    div.style.zIndex = 10;
    div.style.position = "absolute";
    div.style.top = h + "px";
    div.style.right = 0 + "px";
    div.style.left = 0 + "px";
    div.style.height = h*3 + "px";
    div.style.width = w + "px";

    $(`#transition`).animate({
        "top": "-=" + h*3 + "px"
    }, 500,"linear").queue(function() {
        window.location.href = url
    });
}

function backedAni() {
    appendWallInit();
    appendWall();
    createItems();
    createAlice();
    var div = document.getElementById('transition');
    var h = window.innerHeight;
    var w = window.innerWidth;
    div.style.zIndex = 10;
    div.style.position = "absolute";
    div.style.top = -h*2 + "px";
    div.style.right = 0 + "px";
    div.style.left = 0 + "px";
    div.style.height = h*3 + "px";
    div.style.width = w + "px";

    $(`#transition`).animate({
        "top": "+=" + h*3 + "px"
    }, 500,"linear");

}
