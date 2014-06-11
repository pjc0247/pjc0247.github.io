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
    
    dc.globalAlpha = obj.alpha / 255;
    dc.fillText( "민수천재야", obj.x,obj.y );
    
    obj.x += obj.sx;
    obj.y += obj.sy;
    obj.alpha -= 1;
    
    if( obj.alpha == 0 ){
      ms.splice( i, 1 );
    }
  }
  
  dc.fill();
}, 33 );
