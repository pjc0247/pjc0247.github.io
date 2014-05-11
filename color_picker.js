var canvas = document.getElementById("canvas");
var dc = canvas.getContext("2d");

toHSV = function(r,g,b){
  var h =
    Math.acos(
      (0.5 * ((r-g) + (r-b)))
      /
      (Math.sqrt( Math.pow( (r-g), 2 ) + (r-b)*(g-b) ))
    );
  var s = 1 - 3*( Math.min(r,g,b) / (r+g+b) );
  var v = (1/3) * (r+g+b);
  
  return [h,s,v];
}
toRGB = function(h,s,v){
}

refresh = function(){
  
}
