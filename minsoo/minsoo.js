var count = document.getElementById("count");
var canvas = document.getElementById("canvas");
var dc = canvas.getContext("2d");

var ms = new Array();

var on_click = function(){
  obj = {
    x : 640, y : 480,
    sx : Math.random() * 10 - 5, sy : Math.random() * 10,
    alpha : 255
  }
  ms.push( obj );
}

setInterval( function(){
  dc.clearRect(0,0,1280,960);
  
  for( var i in ms ){
    var obj = ms[i];
    
    dc.fillText( "민수천재야", obj.x,obj.y );
    
    obj.x += obj.sx;
    obj.y += obj.sy;
  }
  
  dc.fill();
}, 33 );
