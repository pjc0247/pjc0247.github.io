
var canvas = document.getElementById("canvas");
var dc = canvas.getContext("2d");

var art = new Image();
art.src = "album.png";

getLuminance = function(color){
  var rgb = color.split(',');
  
  return rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
}
getColorDistance = function(color1, color2){
  var rgb1 = color1.split(',');
  var rgb2 = color2.split(',');
  
  return Math.abs(rgb1[0] - rgb2[0]) +
    Math.abs(rgb1[1] - rgb2[1]) +
    Math.abs(rgb1[2] - rgb2[2]);
}

getColorList = function(pixels, w,h){
  var colorList = new Array();
  var map = new Array();
  var candidates = new Array();
  
  /* 빈도맵을 만든다 */
  for(i=0;i<w;i++){
    for(j=0;j<h;j++){
      idx = (j * w + i) * 4;
      key =
        pixels.data[idx + 0] + "," + pixels.data[idx+1] + "," + pixels.data[idx+2];
      
      if( map[key] == undefined )
        map[key] = 1;
      else
        map[key] += 1;
    }
  }
  
  for(i=0;i<5;i++){
    var max = {
     key : "", /* 색상 키 */
      hit : 0 /* 발생 빈도 */
    }; 
    
    for(k in map){
      if( map[k] > max.hit ){
        var flag = true;
        for(c in candidates){
          if( getColorDistance( candidates[c], k) < 100 )
            flag = false;
        }
      
        if( flag == true ){
          max.key = k;
          max.hit = map[k];
        }
      }
    }
    
    candidates.push( max.key );
  }
  
  return candidates;
}

crushImage = function(pixels, crush){
  var crushed = dc.createImageData(pixels.width, pixels.height);
  
  for(i=0;i<pixels.width;i++){
    for(j=0;j<pixels.height;j++){
      idx = (j * pixels.width + i) * 4;
      
      crushed.data[idx+0] = parseInt( pixels.data[idx+0] / crush ) * crush;
      crushed.data[idx+1] = parseInt( pixels.data[idx+1] / crush ) * crush;
      crushed.data[idx+2] = parseInt( pixels.data[idx+2] / crush ) * crush;
      crushed.data[idx+3] = 255;
    }
  }
  
  return crushed;
}
function scaleImage(imageData, scale) {
  var scaled = dc.createImageData(imageData.width * scale, imageData.height * scale);

  for(var row = 0; row < imageData.height; row++) {
    for(var col = 0; col < imageData.width; col++) {
      var sourcePixel = [
        imageData.data[(row * imageData.width + col) * 4 + 0],
        imageData.data[(row * imageData.width + col) * 4 + 1],
        imageData.data[(row * imageData.width + col) * 4 + 2],
        imageData.data[(row * imageData.width + col) * 4 + 3]
      ];
      for(var y = 0; y < scale; y++) {
        var destRow = parseInt( row * scale + y );
        for(var x = 0; x < scale; x++) {
          var destCol = parseInt( col * scale + x );
          for(var i = 0; i < 4; i++) {
            scaled.data[(destRow * scaled.width + destCol) * 4 + i] =
              sourcePixel[i];
          }
        }
      }
    }
  }
  return scaled;
}
downsampleImage = function(pixels, scale){
  var downsampled = scaleImage( pixels, scale );
  var upsampled = scaleImage( downsampled, 1/scale );
  return upsampled;
}

createLuminanceMap = function(pixels){
  var map = dc.createImageData(pixels.width, pixels.height);
  
  for(i=0;i<pixels.width;i++){
    for(j=0;j<pixels.height;j++){
      idx = (j * pixels.width + i) * 4;
      
      rgb =
        pixels.data[idx + 0] + "," + pixels.data[idx+1] + "," + pixels.data[idx+2];
      l = getLuminance( rgb );
      
      map[idx+0] = l * 255;
      map[idx+1] = l * 255;
      map[idx+2] = l * 255;
      map[idx+3] = 255;
    }
  }
  
  return map;
}

art.onload = function(){
  dc.drawImage( art, 0,0, 300,300 );
  
  var pixels = dc.getImageData( 0,0,300,300 );
  
  
  var crushed = crushImage( pixels, 50 );
  var downsampled = downsampleImage( crushed, 0.1 );
  var lmap = createLuminanceMap( pixels );
  
  dc.putImageData( downsampled, 600,0 );
  dc.putImageData( crushed, 300,0 );
  dc.putImageData( lmap, 0,300 );
  
  var colorList = getColorList( pixels, 32,32 );
  
  console.log( colorList );
  
  var offset = 0;
  for(color in colorList){
    dc.fillStyle = "rgb(" + colorList[color] + ")";
    console.log( "rgb(" + colorList[color] + ");" );
    
    dc.fillRect( offset*50,32,50,50 );
    dc.fill();
    offset += 1;
  }
  
}
