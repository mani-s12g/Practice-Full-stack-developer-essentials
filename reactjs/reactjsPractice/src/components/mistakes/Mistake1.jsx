// which falsy values can and cannot be rendered

// Summary Table
// Value	JavaScript Type	Renders in React?
// false	Boolean	No (renders nothing)
// null	Null	No (renders nothing)
// undefined	Undefined	No (renders nothing)
// true	Boolean	No (renders nothing)
// 0	Number	Yes (renders the character 0)
// NaN	Number	Yes (renders the string "NaN")

import React from "react";
import { useState } from "react";

const dummy = {
  id: "1",
  name: "Permissions",
  children: [
    {
      id: "2",
      name: "User Management",
      children: [
        { id: "3", name: "View Users" },
        { id: "4", name: "Edit Users" },
        { id: "5", name: "Delete Users" },
      ],
    },
    {
      id: "6",
      name: "Content Management",
      children: [
        {
          id: "7",
          name: "View Content",
          children: [{ id: "9", name: "childOfContent" }],
        },
        { id: "8", name: "Edit Content" },
      ],
    },
  ],
};

function Mistake1() {
  // const [ count, setCount ] = useState(null);
  const labels = [];
  {
    dummy.children.forEach((item) => {
      labels.push(
        <label htmlFor="" key={item.id}>
          <input type="checkbox" name="" id="" />
          {item.name}
        </label>
      );
    });
  }

  const arr = [1, 2, 3];
  const result = arr.forEach((num) => {
    // console.log(num * 2);
    return num * 2;
  });
  const result1 = arr.map((num) => {
    // console.log(num * 2);
    return num * 2;
  });
  //   or
  //   const result1 = arr.map((num) => num * 2);

  console.log("forEach return result: ", result);
  console.log("map return result: ", result1);

  console.log(
    "forEach o/p: ",
    dummy.children.forEach((item) => {
      return (
        <label key={item.id}>
          <input type="checkbox" />
          {item.name}
        </label>
      );
    })
  );

  console.log(
    "map o/p: ",
    dummy.children.map((item) => {
      return (
        <label key={item.id}>
          <input type="checkbox" />
          {item.name}
        </label>
      );
    })
  );
  // for above result
  //   forEach result: undefined
  // map result: [<label>…</label>, <label>…</label>, <label>…</label>]


  return (
    <div>
      {labels}
      {/* falsy values cant be  rendered (false, true (both boolean cant), null, undefined) */}
      {/* {dummy.children.forEach((item) => {
        console.log(item);
        return (
          <label htmlFor="" key={item.id}>
            <input type="checkbox" />
            {item.name}
          </label>
        );
      })} */}

      {/* <p>Items : {count}</p> */}

      {/* Safer way to render count */}
      {/* <p>Items: {count || 0}</p> */}

      {/* only 0(zero) and NaN(not a number) can be rendered (both typeof are number) */}
      {/* {dummy.children.map((item) => (
            <label htmlFor="" key={item.id}>
                <input type="checkbox" />
                {item.name}
            </label>
        ))} */}
    </div>
  );
}

export default Mistake1;

// import React from "react";
// import "./style.css";

// const dummy = {
//   id: '1',
//   name: 'Permissions',
//   children: [
//     {
//       id: '2',
//       name: 'User Management',
//       children: [
//         { id: '3', name: 'View Users' },
//         { id: '4', name: 'Edit Users' },
//         { id: '5', name: 'Delete Users' },
//       ],
//     },
//     {
//       id: '6',
//       name: 'Content Management',
//       children: [
//         { id: '7', name: 'View Content', children: [
//             {id: '9', name: "childOfContent"}
//           ]
//         },
//         { id: '8', name: 'Edit Content' },
//       ],
//     },
//   ],
// }
// const Child = ({dummy}) => {
//   return (
//         <label htmlFor="checkbox1">
//         <input id="checkbox1" type = "checkbox" />
//         {dummy.name}
//         {dummy.children.map((item) =>
//         <Child dummy={item} />
//         )

//     )
// }

// export default function App() {
//   return (
//     <div>
//       <label htmlFor="checkbox1">
//         <input id="checkbox1" type = "checkbox" />
//         {dummy.name}
//         {dummy.children.forEach((item) => {
//           console.log(item)
//           return (
//         <div key={item.id} style={{padding: "0px 4px"}}>
//           <label htmlFor="checkbox1">
//             <input id="checkbox1" type = "checkbox" name={item.name} />
//             {item.name}
//             <div style={{display: "flex", flexDirection: "column", marginBottom: "8px", paddingLeft: "12px"}}>
//             {item.children.map((c)=>(
//               <label>
//                 <input id="checkbox1" type = "checkbox" name={item.name} />
//                 {c.name}
//               </label>
//             ))}
//           </div>
//           </label>
//         </div>
//       )}
//       )}
//       </label>

//     </div>
//   );
// }

