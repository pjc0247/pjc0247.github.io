var count = document.getElementById("count");
var canvas = document.getElementById("canvas");
var dc = canvas.getContext("2d");

var ms = new Array();

var gen_color = function(){
  return "rgb(" +
    parseInt(Math.random()*255) + "," +
    parseInt(Math.random()*255) + "," +
    parseInt(Math.random()*255) + ")";
}
var on_click = function(){
  for(i=0;i<count.value;i++){
    obj = {
      x : 640, y : 100,
      sx : Math.random() * 10 - 5, sy : Math.random() * 10,
      alpha : 255,
      size : parseInt(Math.random() * 20 + 20),
      color : gen_color()
    }
    ms.push( obj );
  }
}

setInterval( function(){
  dc.clearRect(0,0,1280,960);
  //dc.globalCompositeOperation = "lighter";
  
  for( var i in ms ){
    var obj = ms[i];
    
    dc.font = obj.size + "px Arial";
    dc.globalAlpha = obj.alpha / 255;
    dc.fillStyle = obj.color;
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
