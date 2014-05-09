
var canvas = document.getElementById("canvas");
var dc = canvas.getContext("2d");

console.log( dc );
console.log( "QWER ");

for(i=0;i<10;i++){
  dc.fillStyle = "rgb(" + i*25 + ",0,0)";
  dc.fillRect(0+30*i,0, 30,30);
}
