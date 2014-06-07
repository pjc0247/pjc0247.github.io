var Sequence = function(){
  waitings = 0;
}

Sequence.add = function(obj){
  waitings += 1;
  obj.onload(){
    waitings -= 1;
  }
}
Sequence.wait = function(cb){
  var id = setInterval( function(){
    if( waitings == 0 ){
      cb();
      clearInterval( id );
    }
  }, 50 );
}

// initial call
Sequence();
