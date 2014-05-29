/*
  core.js
*/

var ip_dc = null; // drawing context of canvas2d

var ip_set_dc = function(dc){
  ip_dc = dc;
}

var ip_create_img = function(width, height){
  return dc.createImageData( width,height );
}
var ip_copy_img = function(src){
  var dst = ip_create_img( src.width, src.height );
  
  for(i=0;i<src.width * src.height * 4;i++){
    dst[i] = src[i];
  }
  return dst;
}
