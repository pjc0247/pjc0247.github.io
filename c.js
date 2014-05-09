
var canvas = document.getElementById("canvas");
var dc = canvas.getContext("2d");

var art = new Image();
art.src = "album.png";

getColorList = function(pixels, w,h){
  var colorList = new Array();
  var map = new Array();
  
  for(i=0;i<w;i++){
    for(j=0;j<h;j++){
      idx = (j * width * 4 + i * 4);
      key = pixels[idx + 0] + "," + pixels[idx+1] + "," + pixels[idx+2];
      
      map[key] += 1;
    }
  }
  
  return colorList;
}
art.onload = function(){
  dc.drawImage( art, 0,0, 300,300 );
  
  var pixels = dc.getImageData( 0,0,32,32 );
  
  var colorList = getColorList( pixels, 32,32 );
}
