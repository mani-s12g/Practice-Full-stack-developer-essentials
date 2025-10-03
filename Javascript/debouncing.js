let counter = 0;
const getData = () => {
    // calls an API and gets data
    console.log("API call made, fetching data ...", counter++);
}

// const betterFunction // debouncing fn
const debouncing = function (fn, delay) {
    let timer;
    return function () {
        let context = this,
            args = arguments
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    }
}
const betterFunction = debouncing(getData, 400);


// api call on scroll event or lazy loading or screen size or resize