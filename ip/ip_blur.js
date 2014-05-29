/*
  blur.js
*/

var ip_blur = function(src, r){
  var dst = ip_create_img( src.width, src.height );
  
  _ip_gauss_blur( src,dst, src.width,src.height, r ); 
  
  return dst;
}

var _ip_gauss_boxes = function(sigma, n){
    var wIdeal = Math.sqrt((12*sigma*sigma/n)+1);  // Ideal averaging filter width 
    var wl = Math.floor(wIdeal);  if(wl%2==0) wl--;
    var wu = wl+2;
				
    var mIdeal = (12*sigma*sigma - n*wl*wl - 4*n*wl - 3*n)/(-4*wl - 4);
    var m = Math.round(mIdeal);
    // var sigmaActual = Math.sqrt( (m*wl*wl + (n-m)*wu*wu - n)/12 );
				
    var sizes = [];  for(var i=0; i<n; i++) sizes.push(i<m?wl:wu);
    return sizes;
}

function _ip_gauss_blur(src, dst, w, h, r) {
    var bxs = _ip_gauss_boxes(r, 3);
    _ip_box_blur(src, dst, w, h, (bxs[0]-1)/2);
    _ip_box_blur(dst, src, w, h, (bxs[1]-1)/2);
    _ip_box_blur(src, dst, w, h, (bxs[2]-1)/2);
}
function _ip_box_blur(src, dst, w, h, r) {
    for(i=0;i<w;i++){
        for(j=0;j<h;j++) {
            var cr = 0,cg = 0,cb = 0;
            
            var st_x = Math.max( 0, i-r );
            var st_y = Math.max( 0, j-r );
            var to_x = Math.min( w, i+r+1 );
            var to_y = Math.min( h, i+r+1 );
            
            for(k=st_x;k<to_x;k++){
                for(l=st_y;l<to_y;l++) {
                    var p = ip_get_rgb_at( src, k,l );
                    
                    cr += p[0];
                    cg += p[1];
                    cb += p[2];
                }
            }
            
            var div = ((r+r+1)*(r+r+1));
            ip_set_rgba_at(
            	dst, i,j,
            	cr/div,cg/div,cb/div,
            	255);
        }
    }
}
