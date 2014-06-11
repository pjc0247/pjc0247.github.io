var canvas = document.getElementById("canvas");
var dc = canvas.getContext("2d");

var count = document.getElementById("count");

var on_click = function(){
  console.log("A" + count.value );
}

setInterval( function(){
  dc.fill();
}, 33 );
