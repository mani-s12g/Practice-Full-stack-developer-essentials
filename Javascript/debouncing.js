let counter = 0;
const getData = (param) => {
    // calls an API and gets data
    console.log("API call made, fetching data ...", param, counter++);
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
const betterFunction = debouncing(getData("ok.."), 400);
// betterFunction(); // dont call here - already called in this present folder's index.html file
//  - use live server &  inspect

// getData()
// getData()
// getData()


// api call on scroll event or lazy loading or screen size or resize