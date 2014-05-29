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
          var p = ip_get_rgb_at( src, i+k,j+l );
          
          if( p[0] == 0 && p[1] == 0 && p[2] == 0 ){
            f = true;
            break;
          }
        }
      }
      
      var px = ip_get_rgb_at(i,j);
      if( px[0] )
        ip_set_rgba_at( dst, u,v, 0,0,0,255 );
      else
        ip_set_rgba_at( dst, u,v, 255,255,255,255 );
    }
  }
  
  return dst;
}
