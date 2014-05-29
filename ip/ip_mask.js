/*
  mask.js
*/

IP_R = 2 // red channel
IP_G = 1 // green channel
IP_B = 0 // blue channel 
IP_A = 3 // alpha channel

var ip_reset_masks = function(dst){
  dst.ip_roi = null;
  dst.ip_channel_mask = null;
  dst.ip_luminance_mask = null;
}

/* setter */
var ip_set_roi = function(dst, x,y,w,h){
  dst.ip_roi = [x,y,x+w,y+h];
}
var ip_set_channel_mask = function(dst, ch, min,max){
  if( dst.ip_channel_mask == null )
    dst.ip_channel_mask = [];
  
  dst.ip_channel_mask[ch] = [min, max];
}
var ip_set_luminance_mask = function(dst, ch, min,max){
  dst.ip_luminance_mask = [min, max];
}

/* getter */
var ip_get_roi = function(dst){
  if( dst.ip_roi == null )
    return [0,0, dst.width,dst.height];
  else
    return dst.ip_roi;
}
var ip_get_channel_mask = function(dst, ch){
  if( dst.ip_channel_mask == null )
    return [0,255];
  else if( dst.ip_channel_mask[ch] == null )
    return [0,255];
  else
    return dst.ip_channel_mask[ch];
}
var ip_get_luminance_mask = function(dst){
  if( dst.ip_luminance_mask == null )
    return [0,1];
  else
    return dst.ip_luminance_mask;
}
