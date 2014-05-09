
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
  
  console.log( pixels );
  for(i=0;i<pixels.width;i++){
    for(j=0;j<pixels.height;j++){
      var idx = (j * pixels.width + i) * 4;
      
      var color =
        pixels.data[idx + 0] + "," + pixels.data[idx+1] + "," + pixels.data[idx+2];
      var l = getLuminance( color );
      
    //  console.log( l );
      
      map.data[idx+0] = parseInt( l );
      map.data[idx+1] = parseInt( l );
      map.data[idx+2] = parseInt( l );
      map.data[idx+3] = 255;
    }
  }
  
  
  console.log( map );
  return map;
}

art.onload = function(){
  dc.font = "30px Arial";
  dc.fillStyle = "rgb(0,0,0)";
  
  dc.fillText( "Original Image", 0,30 );
  dc.drawImage( art, 0,30, 300,300 );
  
  var pixels = dc.getImageData( 0,30,300,300 );
  
  var lmap = createLuminanceMap( pixels );
  var crushed = crushImage( pixels, 50 );
  var downsampled = downsampleImage( crushed, 0.1 );
  
  dc.fillText( "Luminance Map", 0,370 );
  dc.putImageData( lmap, 0,400 );
  
  dc.font = "50px Arial";
  dc.fillText( "⎯⎯⎯⎯⇾", 310,30 );
  dc.putImageData( crushed, 400,30 );
  dc.putImageData( downsampled, 800,30 );
  
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
