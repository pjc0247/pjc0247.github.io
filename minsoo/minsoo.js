var count = document.getElementById("count");
var canvas = document.getElementById("canvas");
var dc = canvas.getContext("2d");

var ms = new Array();

var on_click = function(){
  obj = {
    x : 320, y : 240,
    sx : Math.random() * 10, sy : Math.random() * 10,
    alpha : 255
  }
  ms.push( obj );
}

setInterval( function(){
  dc.clearRect(0,0,640,480);
  
  for( var i in ms ){
    var obj = ms[i];
    
    dc.fillText( "민수천재야", obj.x,obj.y );
    
    obj.x += obj.sx;
    obj.y += obj.sy;
  }
  
  dc.fill();
}, 33 );
