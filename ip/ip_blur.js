/*
  blur.js
*/

var ip_blur = function(src, r){
  var dst = ip_create_img( src.width, src.height );
  
  _ip_gauss_blur( src.data,dst.data, src.width,src.height, r ); 
  
  return dst;
}

var _ip_guass_boxes = function(sigma, n){
    var wIdeal = Math.sqrt((12*sigma*sigma/n)+1);  // Ideal averaging filter width 
    var wl = Math.floor(wIdeal);  if(wl%2==0) wl--;
    var wu = wl+2;
				
    var mIdeal = (12*sigma*sigma - n*wl*wl - 4*n*wl - 3*n)/(-4*wl - 4);
    var m = Math.round(mIdeal);
    // var sigmaActual = Math.sqrt( (m*wl*wl + (n-m)*wu*wu - n)/12 );
				
    var sizes = [];  for(var i=0; i<n; i++) sizes.push(i<m?wl:wu);
    return sizes;
}

var _ip_gauss_blur = function(scl, tcl, w, h, r) {
    var bxs = _ip_gauss_boxes(r, 3);
    _ip_box_blur(scl, tcl, w, h, (bxs[0]-1)/2);
    _ip_box_blur(tcl, scl, w, h, (bxs[1]-1)/2);
    _ip_box_blur(scl, tcl, w, h, (bxs[2]-1)/2);
}
var _ip_box_blur = function(scl, tcl, w, h, r) {
    for(var i=0; i<scl.length; i++) tcl[i] = scl[i];
    _ip_box_blur_h(tcl, scl, w, h, r);
    _ip_box_blur_t(scl, tcl, w, h, r);
}
var _ip_box_blur_h = function(scl, tcl, w, h, r) {
    var iarr = 1 / (r+r+1);
    for(var i=0; i<h; i++) {
        var ti = i*w, li = ti, ri = ti+r;
        var fv = scl[ti], lv = scl[ti+w-1], val = (r+1)*fv;
        for(var j=0; j<r; j++) val += scl[ti+j];
        for(var j=0  ; j<=r ; j++) { val += scl[ri++] - fv       ;   tcl[ti++] = Math.round(val*iarr); }
        for(var j=r+1; j<w-r; j++) { val += scl[ri++] - scl[li++];   tcl[ti++] = Math.round(val*iarr); }
        for(var j=w-r; j<w  ; j++) { val += lv        - scl[li++];   tcl[ti++] = Math.round(val*iarr); }
    }
}
var _ip_box_blur_t = function(scl, tcl, w, h, r) {
    var iarr = 1 / (r+r+1);
    for(var i=0; i<w; i++) {
        var ti = i, li = ti, ri = ti+r*w;
        var fv = scl[ti], lv = scl[ti+w*(h-1)], val = (r+1)*fv;
        for(var j=0; j<r; j++) val += scl[ti+j*w];
        for(var j=0  ; j<=r ; j++) { val += scl[ri] - fv     ;  tcl[ti] = Math.round(val*iarr);  ri+=w; ti+=w; }
        for(var j=r+1; j<h-r; j++) { val += scl[ri] - scl[li];  tcl[ti] = Math.round(val*iarr);  li+=w; ri+=w; ti+=w; }
        for(var j=h-r; j<h  ; j++) { val += lv      - scl[li];  tcl[ti] = Math.round(val*iarr);  li+=w; ti+=w; }
    }
}
