// Promises

// Creating a promise
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    if (success) {
      resolve("operation successfull");
    } else {
      reject("operation failed");
    }
  }, 2000);
});

// Using the promise
// myPromise
//     .then(result => console.log(result))
//     .catch(error => console.log(error))

// 1. Using Fetch API with Promises
// GET request
// fetch('https://jsonplaceholder.typicode.com/users/1')
//     .then(response => {
//         if(!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log("data:", data);
//     })
//     .catch(error => {
//         console.log("error:", error);
//     })

// POST request
// fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     title: 'My Post',
//     body: 'This is the content',
//     userId: 1
//   })
// })
//   .then(response => response.json())
//   .then(data => console.log('data:', data))
//   .catch(error => console.log('error:', error));

// 2. Using Async/Await (Modern Approach)
// GET request
// async function fetchUser() {
//   try {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users/2');

//     if(!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     console.log("data using async/await:", data);
//   } catch(error) {
//     console.log("error:", error);
//   }
// }
// fetchUser();

// POST request
// async function createPost() {
//   try {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         title: 'My Post',
//         body: 'Content here',
//         userId: 1
//       })
//     });

//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log('error:', error);
//   }
// }
// createPost();

// Using XMLHttpRequest (Old Method)
// GET request
// const xhr = new XMLHttpRequest();

// xhr.onreadystatechange = function() {
//   if (xhr.readyState === 4) {
//     if (xhr.status === 200) {
//       const data = JSON.parse(xhr.responseText);
//       console.log(data);
//     } else {
//       console.error('Error:', xhr.status);
//     }
//   }
// };

// xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/1', true);
// xhr.send();

// POST request
// const xhrPost = new XMLHttpRequest();

// xhrPost.onreadystatechange = function() {
//   if (xhrPost.readyState === 4 && xhrPost.status === 201) {
//     const data = JSON.parse(xhrPost.responseText);
//     console.log(data);
//   }
// };

// xhrPost.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
// xhrPost.setRequestHeader('Content-Type', 'application/json');
// xhrPost.send(JSON.stringify({
//   title: 'My Post',
//   body: 'Content',
//   userId: 1
// }));

// End of Using XMLHttpRequest (Old Method)

// Using Axios Library
// First install: npm install axios
// or include via CDN: <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

// GET request
// axios.get('https://jsonplaceholder.typicode.com/users/1')
//   .then(response => {
//     console.log('data:', response.data);
//   })
//   .catch(error => {
//     console.log('error:', error);
//   })

// POST request
// axios.post('https://jsonplaceholder.typicode.com/posts', {
//   title: 'My Post',
//   body: 'Content here',
//   userId: 1
// })
//   .then(response => {
//     console.log('data:', response.data);
//   })
//   .catch(error => {
//     console.log('error:',error);
//   })

// With async/await
// async function fetchWithAxios() {
//   try {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
//     console.log(response.data);
//   } catch(error) {
//     console.log('error:', error);
//   }
// }
// fetchWithAxios();

// Promise Chaining for Sequential Requests
// Fetch user, then fetch their posts
// fetch('https://jsonplaceholder.typicode.com/users/1')
//   .then(response => response.json)
//   .then(user => {
//     console.log(user);
//     return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
//   })
//   .then(response => response.json)
//   .then(posts => {
//     console.log(posts)
//   })
//   .catch(error => {
//     console.log(error)
//   });

// Promise.all() for Parallel Requests
// Promise.all([
//   fetch('https://jsonplaceholder.typicode.com/users/1').then(r => r.json()),
//   fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json()),
//   fetch('https://jsonplaceholder.typicode.com/comments/1').then(r => r.json())
// ])
//   .then(([user, post, comment]) => {
//     console.log('User:', user);
//     console.log('Post:', post);
//     console.log('Comment:', comment);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

// With async/await
// async function fetchMultiple() {
//   try {
//     const [user, post, comment] = await Promise.all([
//       fetch('https://jsonplaceholder.typicode.com/users/1').then(r => r.json()),
//       fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json()),
//       fetch('https://jsonplaceholder.typicode.com/comments/1').then(r => r.json())
//     ]);

//     console.log({ user, post, comment });
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
// fetchMultiple();

// Summary
// Best Practices:

// Use async/await for cleaner, more readable code
// Use Fetch API (built-in, modern)
// Use Promise.all() for parallel requests
// Use try/catch for error handling
// Avoid callback hell by using Promises or async/await

// The modern standard is Fetch with async/await for most use cases!

// Important
// Custom Promise.all() Implementation

// 🔹 Behavior:
// Takes an array of promises → resolves when all resolve → rejects if any reject.

function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises))
      return reject(new TypeError("Arguments must be an array"));

    let results = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve(results);
      return;
    }

    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((val) => {
          results[i] = val;
          completed++;
          if (completed == promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

// const p1 = Promise.resolve(10);
// const p2 = Promise.resolve(20);
// const p3 = Promise.resolve(30);

// myPromiseAll([p1, p2, p3]).then(console.log);

// Implement Promise.allSettled
function promiseAllSettled(promises) {
  return Promise.all(
    promises.map(p =>
      Promise.resolve(p)
        .then((value) => ({ status: "fulfilled", value }))
        .catch((reason) => ({ status: "rejected", reason }))
    )
  );
}


const p1 = Promise.resolve(10);
const p2 = Promise.reject(20);
const p3 = Promise.resolve(30);

promiseAllSettled([p1, p2, p3]).then(console.log);


// Retry with Exponential Backoff
