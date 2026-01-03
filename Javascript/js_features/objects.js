const obj = {
    name: "Mani",
    age: 22,
}


// Converting Objects ↔ Arrays (THE MOST IMPORTANT PART)
// Every interview problem becomes easy if you convert the object to an array.

// Object → Array
// What you want	            Code
// keys	                        Object.keys(obj)
// values	                    Object.values(obj)
// key-value pairs	            Object.entries(obj)

// Looping Through an Object
// ✔ for...in — loops keys of an object
for (const key in obj) {
    // console.log(key);
    // console.log(key, obj[key])
}
// ❌ not for arrays
// Use for…in only for objects.

const keys = Object.keys(obj);
console.log("keys:", keys);

const values = Object.values(obj);
console.log("values:", values);

const entries = Object.entries(obj);
console.log("entries:", entries);

// looping through array ✔ ( use 'of' keyword)
for (const key of keys) {
    console.log(key, "efe"); // key here prints key only from 'keys' ( if used 'of' )
    console.log(obj[key]) // obj[key] here prints value of key from 'obj'
}

// following is wrong ❌ but works - looping through array ( use 'in' keyword)
// here we shoulnt use 'in' keyword for arrays, for arrays use 'of' keyword
for (const key in keys) {
    console.log(key) // here this prints index of array
}


// entries
for (const [key, value] of entries) {
    console.log("Loop through entries:", key, value)
}

// const arr = [["a", 1], ["b", 2]];
const arr = [["name", "mani"], ["age", 2]];
const arrToObj = Object.fromEntries(arr);
console.log("arrToObj:", arrToObj);


// 6️⃣ Sorting an Object (Interview Classic)
// Objects can’t be sorted directly.
// Steps:
// 1. Convert to array (Object.entries)
// 2. Sort array
// 3. Convert back (Object.fromEntries)
const obj1 = { apple: 50, banana: 30, carrot: 40 };

const array1 = Object.entries(obj1);
// console.log("array1:", array1);

array1.sort((a, b) => a[1] - b[1]);
console.log("array1:", array1);

const sortedObj = Object.fromEntries(array1);
console.log("sortedObj:", sortedObj);

const sorted = Object.fromEntries(
    Object.entries(obj1).sort((a, b) => a[1] - b[1])
)
console.log("sorted:", sorted);



// 7️⃣ Adding / Updating / Deleting Keys

const obj2 = {}
obj2.name = "mani";
obj2.name = "lop"; // updating or overwriting the previous value mani

obj2["name"] = "pop the hood"; // updating or overwriting the previous value mani
delete obj2.age; // if key is not present then it will not throw error instead it returns true so no error
console.log("obj2", obj2);



// 8️⃣ Copying Objects (VERY IMPORTANT)

// important note
// Yes, shallow copy/copying and shallow clone/cloning refer to the exact same concept, as do deep copy/copying and deep clone/cloning. The terms are used interchangeably in programming and documentation.
// They describe the same fundamental mechanism for duplicating objects in JavaScript:
// Shallow Copy/Cloning: Creates a new top-level container but shares references to nested objects with the original.
// Deep Copy/Cloning: Creates a fully independent copy of all nested objects and data, with no shared references.


// ❌ Wrong (shallow copy)
// This copies the reference.
// const copy = obj2; // wrong ❌
// console.log("copy", copy);
// copy["fr"] = "rr"
// console.log("copy", copy);
// console.log("obj2", obj2);

// ✔ Right ways
// Shallow copy
// Object.assign() // for copying & merging objects
const copyObj2 = Object.assign({}, obj2);
console.log("copyObj2", copyObj2);

copyObj2["fr"] = "rrr"
console.log("copyObj2", copyObj2);
console.log("obj2", obj2);

const product = { name: 'Laptop', price: 999 };
product.brand = 'Dell';
product.price = 899;
product['in-stock'] = true;
Object.assign(product, {
    warranty: '2 years',
    color: 'silver'
});
console.log("product-wwfwdw", product);

const defaults = {
    theme: 'light',
    fontSize: 14,
    notifications: true
};

const userSettings = {
    theme: 'dark',
    language: 'en'
};

// Merge objects (userSettings overwrites defaults)
const finalSettings = Object.assign({}, defaults, userSettings);

// Spread operator (same result, more modern)
const settings = { ...defaults, ...userSettings };

console.log("finalSettings", finalSettings);
console.log("settings", settings);






// 1️⃣2️⃣ Free Practice Problems (Exactly like interviews)
// Problem 1: Sort object by keys

const obj3 = {
    name: "mani",
    age: 22,
}
const sorted1 = Object.fromEntries(
    // Object.entries(obj3).sort((a, b) => a[0].localeCompare(b[0]))
    Object.entries(obj3).sort(([a], [b]) => a.localeCompare(b))
)
console.log("sorted1:", sorted1);

// ok confused about this whole sorting stuff - need to learn


// Problem 2: Count occurrences in array → object
const arr1 = ["a", "b", "a"];
const countOccurences = arr1.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
}, {});
console.log("countOccurences", countOccurences);

const freq = {}

for (const item of arr1) {
    freq[item] = (freq[item] || 0) + 1;
}
console.log("freq", freq);


// Problem 3: Group by property
const arr2 = [
    { name: "pop", age: 26 },
    { name: "mani", age: 22 },
    { name: "mani", age: 24 },
    { name: "lop", age: 22 },
    { name: "pop", age: 22 },
    { name: "lop", age: 24 },
    { name: "rop", age: 24 },
    { name: "pop", age: 25 },
    { name: "mani", age: 26 },
    { name: "lop", age: 25 },
];

// remove dulicate by age using filter and set
const seenAges = new Set();
const uniqueByAgeUsingFilterAndSet = arr2.filter(user => {
    if (seenAges.has(user.age)) {
        return false;
    } else {
        seenAges.add(user.age);
        return true;
    }
});

// 2️⃣ Sort by age ASC (small → big)
const sortedByAge = uniqueByAgeUsingFilterAndSet.sort((a, b) => a.age - b.age);
console.log("sortedByAge", sortedByAge);
console.log("uniqueByAgeUsingFilterAndSet", uniqueByAgeUsingFilterAndSet);

const groupedByAge = arr2.reduce((acc, curr) => {
    (acc[curr.age] = acc[curr.age] || []).push(curr);
    return acc;
}, {});

console.log("groupedByAge", groupedByAge);

const groupedByAge2 = Object.groupBy(arr2, u => u.age);
console.log("groupedByAge2", groupedByAge2);

const groupedByName = Object.groupBy(arr2, u => u.name);
console.log("groupedByName", groupedByName);

// Problem 4: Remove duplicate values
const arr3 = [1, 2, 2, 3, 4, 4, 5];
const unique = arr3.reduce((acc, curr) => {
    if (!acc.includes(curr)) {
        acc.push(curr);
    }
    return acc;
}, []);
console.log("unique", unique);

const seen3 = new Set()
const unique2 = arr3.reduce((acc, i) => {
    if (!seen3.has(i)) {
        seen3.add(i);
        acc.push(i);
    }
    return acc;
}, [])
console.log("unique2", unique2);


// Problem 5: Remove duplicate values using object
const obj5 = {
    apple: 50,
    banana: 30,
    carrot: 50,
    orange: 30
};
const seen = new Set();
const result = {};

for (const [key, value] of Object.entries(obj5)) {
    if (!seen.has(value)) {
        seen.add(value);
        result[key] = value;
    }
}
console.log("result", result);

const g = { name: "mani", age: 22, c: { name: "nested c value" } };

// In JavaScript, objects are assigned by reference, not value, meaning a simple assignment (=) creates a 
// new variable pointing to the same object in memory. Meaning modifying the new variable also modifies 
// the original object.
// const k = g;

// Shallow copy (Only top level properties are copied. Meaning nested objects are not copied and 
// point to the same memory location)
// so use this for simple, flat objects only like primitives like strings, numbers, booleans etc in object top level
const k = { ...g }; // A shallow copy duplicates only the top-level properties.
// const k = { ...g, c: { ...g.c } }; // this is a deep copy (shallow copy we are trying to make 1 level deep)
// console.log("k", k);

k.name = "lop";
k.c.name = "nested lop value";
console.log("k", k);
console.log("g", g);


// 1. Shallow Copy(For simple, flat objects)
// A shallow copy duplicates only the top - level properties.Nested objects still share the same reference, so modifying a nested property in the copy will affect the original.
// Use these methods for flat objects(objects where all properties are primitives like strings, numbers, etc.):

// 1. Spread syntax(...)(Modern, concise syntax):
// const original = { a: 1, b: 2 };
// const copy = { ...original };
// copy.a = 10; // original.a remains 1

// 2.Object.assign():
// const original = { a: 1, b: 2 };
// const copy = Object.assign({}, original);
// copy.a = 10; // original.a remains 1


// const originalDeep = { a: 1, nested: { b: 2 } };
// const copyDeep = structuredClone(originalDeep);
// copyDeep.nested.b = 20; // originalDeep.nested.b remains 2
// console.log("originalDeep", originalDeep);
// console.log("copyDeep", copyDeep);

// 2. Deep Copy (For nested or complex objects)

// A deep copy creates a completely new, independent object with no shared references, even for nested properties.
// Use these methods for objects that contain other objects or arrays:

// 1. structuredClone(object) (The modern, native standard):
// This is the preferred built-in method for most use cases as it correctly handles dates,
// circular references, and many complex data types.
// Limitation: It will throw an error if the object contains functions.

// const original = { a: 1, nested: { b: 2 } };
// const copy = structuredClone(original);
// copy.nested.b = 20; // original.nested.b remains 2

// 2.JSON.parse(JSON.stringify(object))(A common, simple one - liner):
// This method serializes the object to a JSON string and then parses it back into a new JavaScript object.
// Limitations: It has several caveats: it cannot copy functions, Date objects become strings,
// undefined properties are lost, and it fails with circular references.
// const originalJSON = { a: 1, nested: { b: 2 } };
// const copyJSON = JSON.parse(JSON.stringify(originalJSON));
// copyJSON.nested.b = 20; // originalJSON.nested.b remains 2
// console.log("originalJSON", originalJSON);
// console.log("copyJSON", copyJSON);

// 3.External Libraries(e.g., Lodash's _.cloneDeep(obj)):
// For very complex objects, objects with functions, or projects already using utility libraries,
// methods like cloneDeep from the Lodash library offer a robust and reliable solution that handles
// edge cases not covered by native methods.



// Shallow copy of arrays (for primitives)
// const originalArray = [1, 2, 3];
// const copyArray = [...originalArray];
// const copyArray = originalArray.slice();
// const copyArray = Array.from(originalArray);

// copyArray.push(5);
// console.log("originalArray", originalArray);
// console.log("copyArray", copyArray);

// Deep copy of arrays (for objects)
// const originalArray2 = [{ a: 1 }, { b: 2 }];
// const copyArray2 = [...originalArray2];
// console.log("originalArray2", originalArray2);
// console.log("copyArray2", copyArray2);


// const nestedArray = [1, { name: 'A' }, [10, 20]];
// const deepCopy = structuredClone(nestedArray);

// deepCopy[1].name = 'B'; // Modify the nested object in the copy.

// console.log(nestedArray[1].name); // Output: 'A' (Original is protected)
// console.log(deepCopy[1].name); // Output: 'B' (Copy is protected)
// 






// 9️⃣ Nested Objects (Common Interview Trap)

// To safely access nested props:

const person = {
    name: "Mani",
    age: 22,
    // age: undefined,
    // age: null,
    address: {
        city: "Chennai",
        // city: undefined,
        country: "India"
    }
}

// Old way:
const city = person && person.address && person.address.city
console.log("city", city);

// Modern way (optional chaining)
const city2 = person?.address?.city;
console.log("city2", city2);

// Nullish Coalescing
const age = person?.age ?? "not provided";
console.log("age", age);

const city3 = person?.address?.city ?? "not provided";
console.log("city3", city3);


// 🔟 Check if Key Exists
const randomObj = { a: 1, b: 2 };
// console.log("a" in randomObj); // true
// console.log("c" in randomObj); // false

// or
// console.log(randomObj.hasOwnProperty("a")); // true
// console.log(randomObj.hasOwnProperty("c")); // false




// 1️⃣1️⃣ Merging Objects
const s1 = { a: 1, b: 2 };
const s2 = { b: 3, c: 4 };
const merged = { ...s1, ...s2 };
// console.log("merged", merged);



// Object.assign() property

// That JavaScript code is performing a shallow merge of properties into an existing product object using the Object.assign() method.
// Here is a breakdown of what's happening:
// The Object.assign() Method
// The syntax for Object.assign() is Object.assign(target, source1, source2, ...):
// target: The first argument (product) is the target object that will be modified and returned.
// source: The second argument ({ warranty: '2 years', color: 'silver' }) is the source object containing the properties to be copied.
// What the Code Does
// The code snippet modifies the product object in place:
// It checks if the product object already has a warranty property. If so, its value is overwritten with '2 years'. If not, the property is added.
// It checks if the product object already has a color property. If so, its value is overwritten with 'silver'. If not, the property is added.
// The modified product object itself is returned by the function call.
// Example
// Let's see it in action:
// javascript
// // Assume 'product' initially looks like this:
// let product = {
//   name: 'Laptop',
//   price: 999,
//   color: 'black'
// };

// // The code runs:
// Object.assign(product, {
//   warranty: '2 years',
//   color: 'silver' // Overwrites 'black'
// });

// // After the code runs, 'product' has been mutated:
// console.log(product);
// /*
// Output:
// {
//   name: 'Laptop',
//   price: 999,
//   color: 'silver', // Changed from black to silver
//   warranty: '2 years' // Added new property
// }
// */
// Use code with caution.

// Key Takeaway
// The primary purpose of this specific usage of Object.assign() is to
// add new properties to an existing object or overwrite existing properties
// with new values, modifying the original variable directly.




// Object.freeze() property method
// freeze - cannot add, delete, or modify
const frozen = Object.freeze({ a: 1 });
frozen.a = 2;
frozen.b = 2;
delete frozen.a;
console.log("frozen", frozen); // same {a: 1} - frozen  or freezed - cannot add, delete, or modify

// Object.seal() property method
// seal - cannot add or delete, but can modify
const sealed = Object.seal({
    name: 'Sealed',
    value: 200
});
sealed.value = 300;
delete sealed.name;
console.log("sealed", sealed); // {name: 'Sealed', value: 300} - sealed - cannot add or delete, but can modify

// for both
// This won't work (silently fails)
frozen.value = 999;
sealed.newProp = 'test';

// This will work
sealed.value = 999;



// Looping Over Objects
const student = {
    name: 'Alice',
    age: 20,
    grade: 'A',
    enrolled: true
};
const resultStudent = [];
for (let key in student) {
    resultStudent.push(`${key}: ${student[key]}`);
}
console.log("resultStudent", resultStudent);

// Object.entries() property method
const entriesStudent = Object.entries(student);
console.log("entriesStudent", entriesStudent);

// Object.fromEntries() property method
const fromEntriesStudent = Object.fromEntries(entriesStudent);
console.log("fromEntriesStudent", fromEntriesStudent);

// Object.keys() with forEach
const prices = {
    apple: 1.5,
    banana: 0.8,
    orange: 2.0
};

const resultPrices = [];
Object.keys(prices).forEach((key) => {
    resultPrices.push(`${key}: $${prices[key]}`);
    // resultPrices.push(`${key}:` + prices[key]);
});
console.log("resultPrices", resultPrices);

// Object.entries() - Best Way
const inventory = {
    laptops: 15,
    phones: 30,
    tablets: 8
};

console.log(Object.entries(inventory), "dcd")
const resultInventory = [];

// Get both key and value directly
Object.entries(inventory).forEach(([item, count]) => {
    resultInventory.push(`${item}: ${count} units`);
});
console.log("resultInventory", resultInventory);

// Or with map
const formatted = Object.entries(inventory).map(
    ([item, count]) => `${item}: ${count}`
);
console.log("formatted", formatted);


// Arrays of Objects (IMPORTANT)
const users = [
    { name: 'John', age: 25, active: true },
    { name: 'Jane', age: 30, active: false },
    { name: 'Bob', age: 35, active: true }
];

const activeUsers = users.filter(user => user.active);
console.log("activeUsers", activeUsers);

const inactiveUsers = users.filter(user => !user.active);
console.log("inactiveUsers", inactiveUsers);

const resultUsersName = users.map(user => user.name);
console.log("resultUsersName", resultUsersName);

const resultUsersAge = users.map(user => user.age);
console.log("resultUsersAge", resultUsersAge);

const resultUsers = users.map(user => ({
    name: user.name,
    age: user.age
}));
console.log("resultUsers", resultUsers);

const hd = users.filter(user => user.age < 30);
const hd2 = users.find(user => user.age < 30);
const hd3 = users.findIndex(user => user.age < 30);
const hd4 = users.reduce((acc, user) => acc + user.age, 0);
const hd5 = users.map(user => user.age < 30);
const hd6 = users.map(user => {
    if (user.age < 30) {
        return user.name;
    } else {
        return "over 30";
    }
});
console.log("hd", hd)
console.log("hd2", hd2)
console.log("hd3", hd3)
console.log("hd4", hd4)
console.log("hd5", hd5)
console.log("hd6", hd6)


// Map Objects
const products = [
    { name: 'Laptop', price: 999 },
    { name: 'Mouse', price: 29 },
    { name: 'Keyboard', price: 79 }
];

const productNames = products.map(product => product.name);
const productTitles = products.map(product => `name: ${product.name}, price: ${product.price}`);
const productTitles2 = products.map(product => { return { name: `${product.name}` } });
const productDetails = products.map(product => `${product.name}: $${product.price}`);
const productPrices = products.map(product => `${product.price}`);
console.log("productNames", productNames);
console.log("productTitles", productTitles);
console.log("productTitles2", productTitles2);
console.log("productDetails", productDetails);
console.log("productPrices", productPrices);

const discounted = products.map(product => ({
    ...product,
    discoutedPrice: Number((product.price * 0.8).toFixed(2))
}));
console.log("discounted", discounted);

const priceList = products.map(p => ({
    item: p.name,
    cost: `$${p.price}`
}));
console.log("priceList", priceList);

// Find & FindIndex
const employees = [
    { id: 1, name: 'Alice', dept: 'IT' },
    { id: 2, name: 'Bob', dept: 'HR' },
    { id: 3, name: 'Charlie', dept: 'IT' }
];
const bob = employees.find(e => e.name === 'Bob');
const bobIndex = employees.findIndex(e => e.name === 'Bob');
const hasIT = employees.some(e => e.dept === 'IT');
const allIT = employees.every(e => e.dept === 'IT');
console.log("bob", bob);
console.log("bobIndex", bobIndex);
console.log("hasIT", hasIT);
console.log("allIT", allIT);


// Reduce - Most Powerful
const orders = [
    { id: 1, amount: 100, status: 'paid' },
    { id: 2, amount: 50, status: 'paid' },
    { id: 3, amount: 75, status: 'pending' }
];

// Sum all amounts
const totalAmount = orders.reduce((acc, order) => acc + order.amount, 0);
console.log("totalAmount", totalAmount);

// Group order by status
const groupByStatusAmount = orders.reduce((acc, order) => {
    // acc[order.status] = acc[order.status] || [];
    // acc[order.status].push(order.amount);
    // return acc;

    // or
    if (!acc[order.status]) {
        acc[order.status] = [];
    }
    acc[order.status].push(order.amount);
    return acc;
}, {});
console.log("groupByStatusAmount", groupByStatusAmount);

const groupByStatus = orders.reduce((acc, order) => {
    if (!acc[order.status]) {
        acc[order.status] = [];
    }
    acc[order.status].push(order);
    return acc;
}, {})
console.log("groupByStatus", groupByStatus);

// Count by status
const countByStatus = orders.reduce((acc, order) => {
    // if (!acc[order.status]) {
    //     acc[order.status] = 0;
    // }
    // acc[order.status] += 1;

    // or (best use this)
    acc[order.status] = (acc[order.status] || 0) + 1;
    // console.log("acc", acc);
    return acc;
}, {});
console.log("countByStatus", countByStatus);



// Sort Objects
const students = [
    { name: 'Charlie', score: 85 },
    { name: 'Alice', score: 95 },
    { name: 'Bob', score: 90 }
];

// Sort by score (ascending)
const scoreSortAsc = [...students].sort((a, b) => a.score - b.score);
console.log("scoreSortAsc", scoreSortAsc);

const scoreSortDesc = [...students].sort((a, b) => b.score - a.score);
console.log("scoreSortDesc", scoreSortDesc);

const nameSortAsc = [...students].sort((a, b) => a.name.localeCompare(b.name));
console.log("nameSortAsc", nameSortAsc);

const nameSortDesc = [...students].sort((a, b) => b.name.localeCompare(a.name));
console.log("nameSortDesc", nameSortDesc);



// Destructuring (Modern JS)
const user = {
    name: 'John Doe',
    agee: 30,
    email: 'john@example.com',
    location: 'New York'
};

// Extract properties
const { name, agee } = user;
console.log("name", name);
console.log("agee", agee);

// Rename while destructuring
const { email: userEmail } = user;
console.log("userEmail", userEmail);

// Default values
const { phone = 'N/A' } = user;
console.log("phone", phone);

// Rest operator
const { location, ...rest } = user;
console.log("location", location);
console.log("rest", rest);



// Nested Destructuring
const employee = {
    employee_name: 'Alice',
    position: {
        title: 'Developer',
        level: 'Senior',
        department: {
            dept_name: 'Engineering',
            dept_location: 'Building A'
        }
    }
};

const { employee_name, position: { title, level, department: { dept_name: dpName, dept_location } } } = employee;
console.log("employee_name", employee_name);
console.log("title", title);
console.log("level", level);
// console.log("dept_name", dept_name);
// console.log("dept_location", dept_location);
console.log("dpName", dpName);
console.log("dept_location", dept_location);


// Function Parameters
const userDetails = { name: 'Bob', age: 25 };

function oldWay(user) {
    return `${user.name} is ${user.age} years old`;
}
console.log(oldWay(userDetails));

function newWay({ name, age }) {
    return `${name} is ${age} years old`;
}
console.log(newWay(userDetails));


// Function inside Object
const loopObj = {
    naam: "mani",
    run: () => {
        function oldWay(user) {
            return `${user.name} is ${user.age} years old from objFunc`;
        }
        function newWay({ name, age }) {
            return `${name} is ${age} years old from objFunc`;
        }
        const res1 = oldWay(userDetails);
        const res2 = newWay(userDetails);
        return { res1, res2 }
    }
}

console.log(loopObj.run().res1);


// Spread & Rest Operators

const original = {
    name: 'Product',
    price: 100,
    category: 'Electronics'
};

// Spread Operator - Copy
// Shallow copy
const copy = { ...original };

// Copy and modify
const modified = {
    ...original,
    price: 80,
    onSale: true
};

console.log({ original, copy, modified });

// Merge Multiple Objects
const userM = { name: 'John', age: 30 };
const address = { city: 'NYC', zip: '10001' };
const contact = { email: 'john@example.com' };

const merged1 = { ...userM, ...address, ...contact };
console.log("merged1", merged1);

// or
const merged2 = Object.assign({}, userM, address, contact);
console.log("merged2", merged2);

// Later properties override earlier ones
const override = {
    ...userM,
    age: 31, // This wins
    ...address
};
console.log("override", override);



// Remove Property (Rest)
const userEx = {
    id: 1,
    name: 'Alice',
    password: 'secret',
    email: 'alice@example.com',
    role: 'admin'
};

// Remove password using rest
const { password, ...safeUser } = userEx;
console.log("safeUser", safeUser);

// Remove multiple properties
const { id, role, ...publicInfo } = userEx;

console.log("publicInfo", publicInfo);

// Rename Property (Rest) or Rename Object key
const { name: userName, ...restOfUser } = userEx;
console.log("userName", userName);
console.log("restOfUser", restOfUser);
console.log("userEx", userEx)



// Common Interview Questions
// Remove Duplicates by Property

const usersD = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 1, name: 'John', age: 25 }, // duplicate
    { id: 3, name: 'Bob', age: 25 }
];

// Method: 1
const uniqueByAge = usersD.reduce((acc, user) => {
    if (!acc.find(u => u.age === user.age)) {
        acc.push(user);
    }
    return acc;
}, []);

console.log("uniqueByAge:", uniqueByAge)

// Method: 2
const uniqueById = Array.from(
    new Map(usersD.map(u => [u.id, u])).values()
)
console.log("before converting to arr", new Map(usersD.map(u => [u.id, u])).keys())
console.log("uniqueById", uniqueById);

// nneeed to learn and understand thisssss...



// Group Objects by Property

const items = [
    { name: 'Apple', category: 'Fruit', quantity: 10 },
    { name: 'Carrot', category: 'Vegetable', quantity: 20 },
    { name: 'Banana', category: 'Fruit', quantity: 15 },
    { name: 'Broccoli', category: 'Vegetable', quantity: 25 }
];

// Method: 1 - The Modern Approach (Object.groupBy() and Map.groupBy())
const grpByCategory = Object.groupBy(items, item => item.category);
console.log("grpByCategory", grpByCategory);

const grpByCategory2 = Map.groupBy(items, item => item.category);
console.log("grpByCategory2", grpByCategory2);

// Method: 2 -  The Functional Approach (Array.prototype.reduce())
const groupByCategory = items.reduce((acc, item) => {
    const { category } = item;
    if (!acc[category]) {
        acc[category] = [];
    }
    acc[category].push(item);
    return acc;
}, {});

console.log("groupByCategory:", groupByCategory);

// Method: 3 - The Legacy Approach (for...of loop) or The Traditional Approach (for loop or forEach)
const groupedByLoop = {};
for (const item of items) {
    const key = item.category;
    if (!groupedByLoop[key]) {
        groupedByLoop[key] = [];
    }
    groupedByLoop[key].push(item);
}
console.log("groupByLoop", groupedByLoop);

const groupedByLoop2 = {};
items.forEach(item => {
    const key = item.category;
    if (!groupedByLoop2[key]) {
        groupedByLoop2[key] = [];
    }
    groupedByLoop2[key].push(item);
})

console.log("groupByLoop2", groupedByLoop2);


// why should we group objects by property? advantages of grouping objects by property
// How to Use the Grouped Data

// 1. Accessing Specific Groups Directly
// You no longer have to loop through the entire original array to find all fruits. 
// You can access the specific array you need using standard object property access:

console.log("grpByCategoryAccess", grpByCategory.Fruit);
console.log("groupByLoopAccess", groupedByLoop.Fruit[0]);

// 2. Iterating Through the Groups
// You can easily loop through the keys to perform actions on each category of items:

for (const item of Object.keys(grpByCategory)) {
    const itemsInGroup = grpByCategory[item];
    console.log(`There are ${itemsInGroup.length} items in ${item} category`);
}

// 3. Performing Calculations on Groups
// You can quickly aggregate data within each group, such as calculating the total quantity of items per type:

for (const item of Object.keys(grpByCategory)) {
    const itemsInGrp = grpByCategory[item];
    const totalQuantity = itemsInGrp.reduce((acc, item) => acc + item.quantity, 0);
    console.log(`Total quantity of ${item} is ${totalQuantity}`);
}

// Deep Clone Object
const originalD = {
    name: 'John',
    address: {
        city: 'NYC',
        coords: { lat: 40, lng: -74 }
    },
    hobbies: ['reading', 'gaming']
};

// Shallow copy (WRONG for nested objects)
// const shallowClone = { ...originalD };
// shallowClone.address.city = 'LA';  // Changes original too! (bad)

console.log("originalD", originalD);
// console.log("shallowClone", shallowClone);

// Deep clone (RIGHT way)

const deepClone = JSON.parse(JSON.stringify(originalD));
deepClone.address.city = 'LV';  // Doesn't affect original (good)
console.log("deepClone", deepClone);


// Convert Array to Object
const usersAO = [
    { id: 'a1', name: 'John', age: 25 },
    { id: 'b2', name: 'Jane', age: 30 },
    { id: 'c3', name: 'Bob', age: 35 }
];

// using Object.fromEntries
// const oa = Object.entries(usersAO);
// console.log("oa", oa);

// 
const oa2 = Object.fromEntries(
    usersAO.map(user => [user.id, user])
);
console.log("oa2", oa2);


// using Convert to object with id as key
const usersByID = usersAO.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
}, {});
console.log("usersByID", usersByID);



// Flatten Nested Object
const nested = {
    name: 'John',
    address: {
        city: 'NYC',
        zip: '10001'
    },
    contact: {
        email: 'john@example.com'
    }
};

function flatten(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, key) => {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(acc, flatten(obj[key], newKey));
        } else {
            acc[newKey] = obj[key];
        }
        return acc;
    }, {});
}

console.log("Object.keys(nested)", Object.keys(nested))
const flattened = flatten(nested);
console.log("flattened", flattened);

console.log(flattened["address.city"])
console.log(flattened["contact.email"])
console.log(flattened["name"])

flattened["name"] = "follolww"
console.log("flattened", flattened)
console.log("nestedchanged?", nested)
//  
// GROUP BY
const nestedD = [
    {
        name: 'John',
        age: 25,
        employeeDetail: {
            id: 1,
            salary: 5000,
            department: 'Engineering'
        },
    },
    {
        name: 'Jane',
        age: 30,
        employeeDetail: {
            id: 2,
            salary: 6000,
            department: 'HR'
        },
    },
    {
        name: 'Bob',
        age: 35,
        employeeDetail: {
            id: 3,
            salary: 7000,
            department: 'Marketing'
        },
    },
    {
        name: 'Alice',
        age: 40,
        employeeDetail: {
            id: 4,
            salary: 8000,
            department: 'Engineering'
        },
    }
]
const groupByDept = Object.groupBy(nestedD, e => e.employeeDetail.department)
console.log("groupByDept", groupByDept)

// 6️⃣ Sort Items INSIDE Each Group
// Sort users by name inside age group
const sortedGroupsByName = Object.fromEntries(
    Object.entries(groupByDept).map(([dept, employees]) => [
        dept,
        [...employees].sort((a, b) => a.name.localeCompare(b.name))
    ])
)
console.log("sortedGroupsByName", sortedGroupsByName)

// 7️⃣ Sort Groups + Items Together
const sortedGrp = Object.fromEntries(
    Object.entries(groupByDept)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([dept, employees]) => [
            dept,
            [...employees].sort((a, b) => a.name.localeCompare(b.name))
        ])
)
console.log("sortedGrp", sortedGrp)

const groupByAgeRange = Object.groupBy(nestedD, e => {
    if (e.age < 20) return "Teen";
    if (e.age < 30) return "20s";
    if (e.age < 40) return "30s";
    return "40+"
})
console.log("groupByAgeRange", groupByAgeRange)

//  


const seen1 = new Map();
seen1.set("name", "John");
seen1.set(2, "two");
seen1.set({
    id: "id1"
}, "some object value")

// console.log("seen1", seen1)
// console.log("seen1", seen1.values())

const j = []
for (const [key, val] of seen1) {
    j.push({ key, val })
}

// console.log("j", j)



const darry = [{
    id: 1,
    name: "John"
}, {
    id: 2,
    name: "Jane"
}, {
    id: 1,
    name: "Bob"
}]
const s = Array.from(
    new Map(darry.map(d => [d.id, d])).values()
)
console.log("s", s)
// or
const uni = [...new Map(darry.map(d => [d.id, d])).values()]
console.log("uni", uni);

// remove duplicates by id
const seen2 = new Set();
const uni2 = darry.filter(u => {
    if (!seen2.has(u.id)) {
        seen2.add(u.id);
        return true;
    } else {
        return false;
    }
})

console.log("uni2", uni2);




// 
// Render Grouped Users by dept
{
    Object.entries(groupByDept).map(([dept, employees]) => (
        <div key={dept}>
            <h2>{dept}</h2>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>{employee.name}</li>
                ))}
            </ul>
        </div>
    ))
}

// 🔁 React Best Practice (useMemo)
// Never recompute grouping on every render.

const groupedUsers = useMemo(() => {
    return Object.groupBy(users, u => u.age);
}, [users]);


// 🎯 What Do We Usually Do AFTER Grouping Data?

// These are real UI patterns 👇

// ✅ 1. Accordion / Expand–Collapse
// Age → click → show users

// ✅ 2. Sectioned Lists
// Like Contacts grouped by first letter

// ✅ 3. Dashboard Cards
// Group → show counts
const counts = Object.entries(groupedByAge).map(
    ([age, users]) => ({ age, count: users.length })
);

// ✅ 4. Charts
// Group data → show bar chart / pie chart
// labels: Object.keys(groupedByAge)
// values: Object.values(groupedByAge).map(g => g.length)

// ✅ 5. Sorting + Filtering on Grouped Data
// Example:
// Show only groups with more than 3 users

Object.entries(groupedByAge)
    .filter(([_, users]) => users.length > 3)


// ✅ 6. Pagination per Group
// Show only first N items per group

// 🧪 Interview Questions on groupBy
// 🔥 VERY COMMON

// Group users by age / gender / department

// Sort groups by key

// Sort users inside each group

// Render grouped data in React

// Add search inside grouped data

// Collapse / expand grouped sections

// Count users per group

// Convert grouped object back to flat array
