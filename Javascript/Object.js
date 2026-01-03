// Deep Clone of an Object

// 🔹 Problem:
// const newObj = {...obj} or Object.assign() does shallow cloning.

const obj = {
  name: "mani",
};
console.log(obj);

const newObj = { ...obj };
newObj.name = "manikanta";
// console.log(newObj, "newObj")
// console.log(obj, "after changing newObj");

const deepClone = JSON.parse(JSON.stringify(obj));
deepClone.name = "manikanta";
console.log(deepClone, "deepClone");

// 🔹 Robust recursive version:
// Object & Data Manipulation
// Deep Clone
function deepCloneRecursion(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
//   if (obj instanceof Date) return new Date(obj);
//   if (obj instanceof RegExp) return new RegExp(obj);
  if (hash.has(obj)) return hash.get(obj); // handle circular references

  const clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone);

  for (let key in obj) {
    clone[key] = deepCloneRecursion(obj[key], hash);
  }
  return clone;
}

const objR = {
  a: 1,
  b: {
    c: 2,
  },
};
const clone = deepCloneRecursion(objR);
console.log(clone, "clonedRec");
clone.b.c = 100;

// check the original objR
console.log(objR.b.c, "checkng ori"); // 2 (original unchanged)




// Deep Equal / Object Comparison

function deepEqual (obj1, obj2) {
    if(obj1 === obj2) return true;

    if(typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if(keys1.length !== keys2.length) return false;

    for(let key of keys1) {
        if(!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

const m = {
    name: "mani",
    age: 27,
    job: {
        previous: "yes",
        now: "?"
    }
}
const n = {
    name: "mani",
    age: 27,
    job: {
        pre: "yes",
        now: "?"
    }
}

const res = deepEqual(m, n);
console.log(res, "deepEqual result");

// Flatten Object

function flattenObject (obj, prefix = '') {
    return Object.keys(obj).reduce((acc, key) => {
        const pre = prefix.length ? prefix + '.' : '';

        if(typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            Object.assign(acc, flattenObject(obj[key], pre + key));
        } else {
            acc[pre + key] = obj[key];
        }
        return acc;
    }, {});
}

const Example = {a: {b: {c: 1}}};
const res1 = flattenObject(Example);
// const res1 = flattenObject(n);
console.log(res1, "flatn obj")
// const Example: {a: {b: {c: 1}}} => {'a.b.c': 1}