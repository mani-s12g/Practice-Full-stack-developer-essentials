// const obj1 = {
//     name: "Mani",
//     age: 28
// }

// console.log(Object.keys(obj1), "keys");
// console.log(Object.values(obj1), "values");
// console.log(Object.entries(obj1), "entries");

// for(const key in obj1) {
//     // console.log(key, "keys");
//     console.log(key, obj1[key]);
// }

// const entries = Object.entries(obj1);
// console.log(entries, "entries");

// for(const [key, value] of entries) {
//     console.log(key, value);
// }



// arrays to objects
// const arr1 = [["name", "mani"], ["age", 2]];
// const arr1 = [1, 2, 3];
// console.log(Object.fromEntries(arr1), "ato")
// TypeError: Iterator value 1 is not an entry object

const obj1 = {kapple: 50, banana: 30, carrot: 40};
// const sortedObj1 = Object.fromEntries(Object.entries(obj1).sort((a, b) => a[1] - b[1]));
// console.log(sortedObj1, "sortedObj1")


// const obj1 = {};
// obj1.name = "fer";
// obj1["age"] = 43;
// delete obj1.agew;
// console.log(obj1);

// const obj2 = {e: 2}
// const obj2 = {
//     e: 2, 
//     d: { name: "s", age: "34"}
// }
// const copy = obj2; // wrong ❌
// console.log("copy", copy);
// copy["fr"] = "rr"
// console.log("copy", copy);
// console.log("obj2", obj2);
// copy.e = 90
// copy.d.name = "changed"

// console.log("copy", copy);
// console.log("obj2", obj2);

// console.log("333333333333333333333333333333333333333333333333333333333333")

// const copyObj2 = Object.assign({}, obj2);
// console.log("copyObj2", copyObj2);

// copyObj2["fr"] = "rrr"
// copyObj2.e = 4
// copyObj2.d.name = "copyedName"


// console.log("copyObj2", copyObj2);
// console.log("obj2", obj2);


// const product = { name: 'Laptop', price: 999 };
// console.log(product);
// Object.assign(product, { name1: "der", job: "elite mechanic"})

// console.log(product);


// console.log(
//     "sorted",
//     Object.fromEntries(
//         Object.entries(obj1).sort((a, b) => a[0].localeCompare(b[0]))
//         // Object.entries(obj1).sort(([a], [b]) => a.localeCompare(b))
//     )
// )


const arr = ["a", "b", "a"];
// console.log(
//     "occurrances",
//     arr.reduce((acc, curr) => {
//         acc[curr] = (acc[curr] || 0) + 1;
//         return acc;
//     }, {})
// )

const freq = {}
for (const item of arr) {
    freq[item] = (freq[item] || 0) + 1;
}
// console.log("freq", freq)

// continue on grp property....


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

// const set1 = new Set();
// const f = []
// for(const i of arr2) {
//     if(!set1.has(i.age)) {
//         set1.add(i.age);
//         f.push(i);
//     }
// }

// console.log(f);

// const set1 = new Set();
// console.log(
//     "f",
//     arr2.filter(s => {
//         if(set1.has(s.age)) {
//             return false;
//         } else {
//             set1.add(s.age);
//             return true;
//         }
//     })
// )

console.log(arr2.sort((a,b) => a.age - b.age));



// console.log(
//     "g",
//     arr2.reduce((acc, curr) => {
//         (acc[curr.age] = acc[curr.age] || []).push(curr); 
//         return acc;
//     }, {})
// )

// console.log(Object.groupBy(arr2, u => u.age))
// console.log(Object.groupBy(arr2, u => u.name))

