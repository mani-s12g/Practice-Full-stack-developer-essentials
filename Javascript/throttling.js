let counter = 0;
const expensiveFn = () => {
    // calls an API and gets data
    console.log("API call made, fetching data ...", counter++);
}

const throttling = function (fn, limit) {
    let flag = true;
    return function () {
        let context = this,
            args = arguments
        if(flag) {
            fn.apply(context, args);
            flag = false;
            setTimeout(() => {
                flag = true;
            }, limit);
        }
    }
}

const efficientFn = throttling(expensiveFn, 1000);


// modern 
const throttle = (fn, limit) => {
  let isWaiting = false;

  return function(...args) {
    if (!isWaiting) {
      fn.apply(this, args);
      isWaiting = true;
      setTimeout(() => {
        isWaiting = false;
      }, limit);
    }
  };
};
