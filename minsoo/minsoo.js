var count = document.getElementById("count");
var canvas = document.getElementById("canvas");
var dc = canvas.getContext("2d");

var ms = new Array();

var on_click = function(){
  for(i=0;i<count.value;i++){
    obj = {
      x : 640, y : 100,
      sx : Math.random() * 10 - 5, sy : Math.random() * 10,
      alpha : 255,
      size : parseInt(Math.random() * 20 + 10)
    }
    ms.push( obj );
  }
}

setInterval( function(){
  dc.clearRect(0,0,1280,960);
  
  var grd = dc.createLinearGradient(0,0,200,0);
  grd.addColorStop(0,"red");
  grd.addColorStop(1,"white");

  dc.fillStyle = grd;

  for( var i in ms ){
    var obj = ms[i];
    
    dc.font = obj.size + "px Arial";
    dc.globalAlpha = obj.alpha / 255;
    dc.fillText( "민수천재야", obj.x,obj.y );
    
    obj.x += obj.sx;
    obj.y += obj.sy;
    obj.alpha -= 2.5;
    
    if( obj.alpha == 0 ){
      ms.splice( i, 1 );
    }
  }
  
  dc.fill();
}, 33 );