var Preload = function(){
}

Preload.add = function(path){
  sprite = new Sprite( path );
  
  Sequence.add( sprite );
}
Preload.add_array = function(ary){
  for( var i in ary ){
    Preload.add( ary[i] );
  }
}

// initial call
Preload();
