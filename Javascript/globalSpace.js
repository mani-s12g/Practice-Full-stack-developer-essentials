// whenever js program runs a globalSpace (window object), global Execution Context and this is created
// globalSpace is window object only
// this === globalSpace

// anythings outside functioon is gloabl space
// inside function is local space

var globalSpaceVariable = 10;
function globalSpaceFunction () {
    var localSpaceVariable = 1;
}


var a = 10;
// so window.a === a === this
console.log(window.a);
console.log(a);
console.log(this.a);