
var canvas = document.getElementById("canvas");
var dc = canvas.getContext("2d");

var art = new Image();
art.src = "album.png";
art.onload = function(){
  dc.drawImage( 0,0, art );
}
