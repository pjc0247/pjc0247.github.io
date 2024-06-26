
var canvas = document.getElementById("canvas");
var dc = canvas.getContext("2d");

var crush_val = 20;
var downsampling_val = 10;
var threshold_val = 100;

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
          if( getColorDistance( candidates[c], k) < threshold_val )
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

refresh = function(){
  dc.clearRect( 0,0, canvas.width, canvas.height );
  dc.font = "30px Arial";
  dc.fillStyle = "rgb(0,0,0)";
  
  dc.globalAlpha = 1;
  dc.drawImage( art, 0,0, 300,300 );
  /*
  dc.globalAlpha = 0.2;
  dc.drawImage( art, 0,0, 300+3,300+3 );
  dc.drawImage( art, 0,0, 300-3,300-3 );
  dc.globalAlpha = 0.3;
  dc.drawImage( art, 0,0, 300+5,300+5 );
  dc.drawImage( art, 0,0, 300-5,300-5 );
  dc.globalAlpha = 0.6;
  dc.drawImage( art, 0,0, 300+7,300+7 );
  dc.drawImage( art, 0,0, 300-7,300-7 );
  */
  var pixels = dc.getImageData( 0,0,300,300 );
  dc.fillText( "Source", 0,20 );
  
  var lmap = createLuminanceMap( pixels );
  var crushed = crushImage( pixels, crush_val );
  var downsampled = downsampleImage( crushed, downsampling_val * 0.01 );
  
  dc.putImageData( lmap, 0,300 );
  dc.fillText( "Luminance Map", 0,330 );
  
  dc.font = "80px Arial";
  
  dc.fillText( "⇾", 320,170 );
  dc.fillText( "⇾" ,720,170 );
  dc.putImageData( crushed, 400,0 );
  dc.putImageData( downsampled, 800,0 );
  
  dc.font = "30px Arial";
  dc.fillText( "crush(" + crush_val + ")", 410,20);
  dc.fillText( "downsample(" + (100-downsampling_val) + ")", 810,20);
  
  var colorList = getColorList( downsampled, 300,300 );
  
  dc.fillText( "Threshold(" + threshold_val + ")", 500,350 );
  var offset = 0;
  for(color in colorList){
    dc.fillStyle = "rgb(0,0,0)";
    dc.fillRect( offset*55 + 500-2, 400-2,4 +25 + (5-offset)*5,4+25 + (5-offset)*5 );
    
    dc.fillStyle = "rgb(" + colorList[color] + ")";
    dc.fillRect( offset*55 + 500, 400,25 + (5-offset)*5,25 + (5-offset)*5 );
    
    dc.fill();
    offset += 1;
  }
}

art.onload = function(){
  refresh();
}


var crush_slider = document.getElementById("crush");
crush_slider.onchange = function(e){
  crush_val = e.target.value;
  refresh();
}
var downsampling_slider = document.getElementById("downsampling");
downsampling_slider.onchange = function(e){
  downsampling_val = 101 - e.target.value;
  refresh();
}
var threshold_slider = document.getElementById("threshold");
threshold_slider.onchange = function(e){
  threshold_val = e.target.value;
  refresh();
}



dc.font = "80px Arial";
dc.fillStyle = "rgb(0,0,0)";
  
dc.fillText( "Please Wait...", 50,70 );
dc.fill();
