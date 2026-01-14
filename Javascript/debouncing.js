let counter = 0;
const getData = (value) => {
    // calls an API and gets data
    console.log("API call made, fetching data ...", counter++, value);
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

// using arrow function
// const debouncingFn2 = (fn, delay) => {
//     console.log("fn2..")
//     let timer;
//     return function () {
//         let context = this,
//             args = arguments
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             fn.apply(context, args);
//         }, delay);
//     }
// }
// // showing that we can pass arguments to debouncing fn
// but calling getData() here will not work, we shouldnt call getData() like this
// const betterFunction = debouncing(getData, 400, "ok.lop");


// we should call like this instead (Correct , good , use this only)
// const betterFunction = debouncing(getData, 400);

//using arrow function
// const betterFunction2 = debouncingFn2(getData, 400);

// betterFunction(); // dont call here - already called in this present folder's index.html file
//  - use live server &  inspect

// getData()
// getData()
// getData()



// modern way using rest parameter
const debouncingFn3 = (fn, delay) => {
    let timer;
    return function (...args) { // Modern way to capture all arguments
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}

const betterFunction3 = debouncingFn3(getData, 400);

// Select the element and add the listener
// const input = document.querySelector('input');
// input.addEventListener('keyup', (event) => {
//     // You can now pass specific data to your debounced function
//     betterFunction(event.target.value); 
// });

// api call on scroll event or lazy loading or screen size or resize