/*
  morp.js
*/

var ip_morp_erode = function(src, w,h){
  var roi = ip_get_roi( src );
  var dst = ip_create_img( roi[2],roi[3] );

  for(i=roi[0],u=0;i<roi[2];i++,u++){
    for(j=roi[1],v=0;j<roi[3];j++,v++){
      
      var to_x = Math.min( roi[2], i+w );
      var to_y = Math.min( roi[3], j+h );
      var f = false;
      
      for(k=i;k<to_x;k++){
        for(l=j;l<to_y;l++){
          var p = ip_get_rgb_at( src, k,l );
          
          if( p[0] <= 128 && p[1] <= 128 && p[2] <= 128 ){
            f = true;
            break;
          }
        }
      }
      
      if( f )
        ip_set_rgba_at( dst, u,v, 0,0,0,255 );
      else
        ip_set_rgba_at( dst, u,v, 255,255,255,255 );
    }
  }
  
  return dst;
}
var ip_morp_dilate = function(src, w,h){
  var roi = ip_get_roi( src );
  var dst = ip_create_img( roi[2],roi[3] );

  for(i=roi[0],u=0;i<roi[2];i++,u++){
    for(j=roi[1],v=0;j<roi[3];j++,v++){
      
      var to_x = Math.min( roi[2], i+w );
      var to_y = Math.min( roi[3], j+h );
      var f = false;
      
      for(k=i;k<to_x;k++){
        for(l=j;l<to_y;l++){
          var p = ip_get_rgb_at( src, k,l );
          
          if( p[0] >= 128 && p[1] >= 128 && p[2] >= 128 ){
            f = true;
            break;
          }
        }
      }
      
      if( f )
        ip_set_rgba_at( dst, u,v, 255,255,255,255 );
      else
        ip_set_rgba_at( dst, u,v, 0,0,0,255 );
    }
  }
  
  return dst;
}


var ip_test_morp_erode = function(src, w,h){
  var roi = ip_get_roi( src );
  var dst = ip_create_img( roi[2],roi[3] );

  for(i=roi[0],u=0;i<roi[2];i++,u++){
    for(j=roi[1],v=0;j<roi[3];j++,v++){
      
      var to_x = Math.min( roi[2], i+w );
      var to_y = Math.min( roi[3], j+h );
      var f = false;
      
      var min = 255+255+255;
      var min_p = 0;
      
      for(k=i;k<to_x;k++){
        for(l=j;l<to_y;l++){
          var p = ip_get_rgb_at( src, k,l );
          var sum = p[0] + p[1] + p[2];
          
          if( min > sum ){
            min = sum;
            min_p = p;
          }
        }
      }
      
      ip_set_rgba_at(
        dst, u,v,
        min_p[0],min_p[1],min_p[2],255 );
    }
  }
  
  return dst;
}
var ip_test_morp_dilate = function(src, w,h){
  var roi = ip_get_roi( src );
  var dst = ip_create_img( roi[2],roi[3] );

  for(i=roi[0],u=0;i<roi[2];i++,u++){
    for(j=roi[1],v=0;j<roi[3];j++,v++){
      
      var to_x = Math.min( roi[2], i+w );
      var to_y = Math.min( roi[3], j+h );
      var f = false;
      
      var max = 0;
      var max_p = 0;
      
      for(k=i;k<to_x;k++){
        for(l=j;l<to_y;l++){
          var p = ip_get_rgb_at( src, k,l );
          var sum = p[0] + p[1] + p[2];
          
          if( max < sum ){
            max = sum;
            max_p = p;
          }
        }
      }
      
      ip_set_rgba_at(
        dst, u,v,
        max_p[0],max_p[1],max_p[2],255 );
    }
  }
  
  return dst;
}
