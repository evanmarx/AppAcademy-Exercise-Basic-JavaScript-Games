//Hanoi Logic


var range = function(start , end) {
  var inter = [];

  if((end-start)<=1){
    return [start];
  }

  inter = range(start + 1, end);
  return [start].concat(inter);

};

function Hanoi(stories) {
  this.towers = [[],[],[]];
  this.stories = stories;
};

Hanoi.prototype.setup = function(){
  this.towers[0] = range(0, this.stories+1);
  this.towers[1] = [0];
  this.towers[2] = [0];
};

Hanoi.prototype.winCondition = function(){
  return !!(towers[2].length === stories+1)
  // arr1 = this.towers[2];
  // arr2 = range(0, this.stories+1);
  // return !(arr1<arr2 || arr2<arr1);
};

Hanoi.prototype.legalMove = function(from, to) {
  return (this.towers[to][(this.towers[to].length - 1)] <
         this.towers[from][(this.towers[from].length - 1)]);
};

Hanoi.prototype.move = function(from, to) {

  if (this.legalMove(from, to)) {
    this.towers[to].push(this.towers[from].pop());
  } else {
    return false;
  }

  return true;
};

//
//jQuery Stuff

$(document).ready(function() {
  console.log( 'ready!' ); // IT WORKS!!!

  var $panels = $(".panel");

  var from;
  var to;
  var h = new Hanoi(3);
  h.setup();
  var clickVal;
  var clickCount = 1;


  $panels.click(function(){
    clickVal = $panels.index(this);
    clickCount++;

    if (clickCount % 2 === 0) {
      from = clickVal;
    }
    else {
      to = clickVal;

      if (h.move(from, to)){
        var $piece = $panels.eq(from).find('ol li').first();
        $panels.eq(to).find("ol").prepend($piece);
      }
      else {
        alert( "Bad move ");
      }

    }

    if( h.winCondition() ) {
      alert("You've Won!");
      h.setup();
    }


  });

});





















