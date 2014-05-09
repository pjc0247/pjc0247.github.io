
var canvas = document.getElementById("canvas");
var dc = canvas.getContext("2d");

var art = new Image();
art.src = "album.png";

getColorList = function(pixels, w,h){
  var colorList = new Array();
  var map = new Array();
  var candidates = new Array();
  
  /* 빈도맵을 만든다 */
  for(i=0;i<w;i++){
    for(j=0;j<h;j++){
      idx = (j * w * 4 + i * 4);
      key = pixels[idx + 0] + "," + pixels[idx+1] + "," + pixels[idx+2];
      
      map[key] += 1;
    }
  }
  
  console.log( pixels );
  for(i=0;i<5;i++){
    var max = {
     key : "", /* 색상 키 */
      hit : 0 /* 발생 빈도 */
    }; 
    
    for(k in map){
      console.log(k);
      if( map[k] > max.hit ){
        var flag = true;
        for(c in candidates){
          if( c == k )
            flag = false;
        }
      
        if( flag == true ){
          candidates.push( map[k] );
        }
      }
    }
  }
  
  return candidates;
}
art.onload = function(){
  dc.drawImage( art, 0,0, 32,32 );
  
  var pixels = dc.getImageData( 0,0,32,32 );
  
  var colorList = getColorList( pixels, 32,32 );
  
  console.log( colorList );
  dc.fillStyle = "rgb(" + colorList[0] + ");";
}
