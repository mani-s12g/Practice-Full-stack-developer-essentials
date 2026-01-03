function x() {
    var a = 7;
    return function y() {
        console.log(a);
    }
    a = 100;
    // return y;
    // y();
    // a = 100;
    // y();
}
var z = x();
z();