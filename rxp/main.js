var canvas = document.getElementById("canvas");
var dc = canvas.getContext("2d");

var layerObject = new Array();
var layerBackground = new Array();
var layerEffect = new Array();
var layerUi = new Array();

var update = function(){
  for( var i in layerBackground ) layerBackground[i].update();
  for( var i in layerObject ) layerObject[i].update();
  for( var i in layerEffect ) layerEffect[i].update();
  for( var i in layerUi ) layerUi[i].update();
}
var draw = function(){
  for( var i in layerBackground ) layerBackground[i].draw();
  for( var i in layerObject ) layerObject[i].draw();
  for( var i in layerEffect ) layerEffect[i].draw();
  for( var i in layerUi ) layerUi[i].draw();
}

setInterval( function(){
  update();
  draw();
}, 33 );
