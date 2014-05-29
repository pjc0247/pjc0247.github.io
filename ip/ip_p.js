/*
  p.js
*/

var ip_is_in_range = function(val, range){
  if( range[0] <= val && range[1] >= val )
    return true;
  else
    return false;
}
var ip_get_rgb_at = function(dst, x,y){
  var idx = (y * dst.width + x) * 4;
  
  return [ dst.data[idx+0], dst.data[idx+1], dst.data[idx+2] ];
}
var ip_get_rgba_at = function(dst, x,y){
  var idx = (y * dst.width + x) * 4;
  
  return [ dst.data[idx+0], dst.data[idx+1], dst.data[idx+2],
           dst.data[idx+3] ];
}

var ip_set_rgb_at = function(dst, x,y, r,g,b){
  var idx = (y * dst.width + x) * 4;
  
  dst.data[idx+0] = r;
  dst.data[idx+1] = g;
  dst.data[idx+2] = b;
}
var ip_set_rgba_at = function(dst, x,y, r,g,b,a){
  var idx = (y * dst.width + x) * 4;
  
  dst.data[idx+0] = r;
  dst.data[idx+1] = g;
  dst.data[idx+2] = b;
  dst.data[idx+3] = a;
}

var ip_lighten = function(dst, val){
  var roi = ip_get_roi( dst );
  var ch_mask = [];

  for(i=0;i<4;i++){
    ch_mask[i] = ip_get_channel_mask( dst, i );
  }
  
  for(i=roi[0];i<roi[2];i++){
    for(j=roi[1];j<roi[3];j++){
      var idx = (j * dst.width + i) * 4;
      
      for(k=0;k<IP_A;k++){
        if( ip_is_in_range( dst.data[idx+k], ch_mask[k] ) ){
          dst.data[idx+k] = Math.min( dst.data[idx+k]+val, 255 );
        }
      }
    }
  }
}
var ip_darken = function(dst, val){
  var roi = ip_get_roi( dst );
  var ch_mask = [];

  for(i=0;i<4;i++){
    ch_mask[i] = ip_get_channel_mask( dst, i );
  }
  
  for(i=roi[0];i<roi[2];i++){
    for(j=roi[1];j<roi[3];j++){
      var idx = (j * dst.width + i) * 4;
      
      for(k=0;k<IP_A;k++){
        if( ip_is_in_range( dst.data[idx+k], ch_mask[k] ) ){
          dst.data[idx+k] = Math.max( dst.data[idx+k]-val, 0 );
        }
      }
    }
  }
}

var ip_contour_4x = function(src, threshold){
  var roi = ip_get_roi( src );
  var dst = ip_create_img( roi[2], roi[3] );
  
  for(i=roi[0],u=0;i<roi[2];i++,u++){
    for(j=roi[1],v=0;j<roi[3];j++,v++){
      var pv = ip_get_rgb_at( src, i,j ); // pivot
      
      if( i != roi[0] ){
        var left = ip_get_rgb_at( src, i-1, j );
        
        if( ip_rgb_distance(
          pv[0],pv[1],pv[2],
          left[0],left[1],left[2]) >= threshold ){
          
          console.log("Q");
          ip_set_rgba_at( dst, u,v, 255,255,255,255 );
          continue;    
        }
      }
      if( i != roi[2] ){
        var right = ip_get_rgb_at( src, i+1, j );
        
        if( ip_rgb_distance(
          pv[0],pv[1],pv[2],
          right[0],right[1],right[2]) >= threshold ){
          
          ip_set_rgba_at( dst, u,v, 255,255,255,255 );
          continue;    
        }
      }
      if( j != roi[1] ){
        var up = ip_get_rgb_at( src, i, j-1 );
        
        if( ip_rgb_distance(
          pv[0],pv[1],pv[2],
          up[0],up[1],up[2]) >= threshold ){
          
          ip_set_rgba_at( dst, u,v, 255,255,255,255 );
          continue;    
        }
      }
      if( j != roi[3] ){
        var down = ip_get_rgb_at( src, i, j+1 );
        
        if( ip_rgb_distance(
          pv[0],pv[1],pv[2],
          down[0],down[1],down[2]) >= threshold ){
          
          ip_set_rgba_at( dst, u,v, 255,255,255,255 );
          continue;    
        }
      }
      
      ip_set_rgba_at( dst, u,v, 0,0,0 );
    }
  }
  
  return dst;
}
