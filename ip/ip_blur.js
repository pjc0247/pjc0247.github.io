/*
  blur.js
*/

var ip_blur = function(src, r){
  var dst = ip_create_img( src.width, src.height );
  
  gaussBlur( src,dst, src.width,src.height, r ); 
  
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

function gaussBlur(scl, tcl, w, h, r) {
    var bxs = _ip_gauss_boxes(r, 3);
    boxBlur(scl, tcl, w, h, (bxs[0]-1)/2);
    boxBlur(tcl, scl, w, h, (bxs[1]-1)/2);
    boxBlur(scl, tcl, w, h, (bxs[2]-1)/2);
}
function boxBlur(scl, tcl, w, h, r) {
    for(var i=0; i<h; i++){
        for(var j=0; j<w; j++) {
        	
            var cr = 0;
            var cg = 0;
            var cb = 0;
            for(var iy=i-r; iy<i+r+1; iy++){
                for(var ix=j-r; ix<j+r+1; ix++) {
                    var x = Math.min(w-1, Math.max(0, ix));
                    var y = Math.min(h-1, Math.max(0, iy));
                    var p = ip_get_rgb_at( scl, x,y );
                    
                    cr += p[0];
                    cg += p[1];
                    cb += p[2];
                }
            }
            
            ip_set_rgba_at(
            	tcl,
            	cr/((r+r+1)*(r+r+1)),cg/((r+r+1)*(r+r+1)),cb/((r+r+1)*(r+r+1)),
            	255);
        }
    }
}
