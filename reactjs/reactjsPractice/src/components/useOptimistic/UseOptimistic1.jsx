import { startTransition } from "react";
import { useOptimistic } from "react";
import { useState } from "react";

function UseOptimistic1() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  const createTodo = async (newTodo) => {
    // addOptimisticTodo(newTodo); // Optimistic update
    // Wrap the optimistic update inside startTransition
    startTransition(() => {
    //   addOptimisticTodo(newTodo);
      addOptimisticTodo({...newTodo, pending: true});
    });
    // Simulate server delay
    await new Promise((res) => setTimeout(res, 1000));
    // After confirmation, update the real todos
    setTodos((prev) => [...prev, {...newTodo, pending: false}]);
  };

  const handleAdd = () => {
    if (input.trim() !== "") {
      const newTodo = {
        id: Date.now(), // CHANGED
        text: input,
        completed: false,
      };
      createTodo(newTodo); // NEW
      setInput("");
    }
  };

  const todoObj = {
    id: todos.length + 1,
    text: input,
    completed: false,
  };
  const handleEnter = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault();
      setTodos((t) => [...t, todoObj]);
      setInput("");
    }
  };
  //   const handleAdd = () => {
  //     if (input.trim() !== "") {
  //       setTodos((t) => [...t, todoObj]);
  //       setInput("");
  //     }
  //   };
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((ele) => ele.id !== id);
    setTodos(updatedTodos);
  };

  const toggleCompleted = (id) => {
    const updatedCompleted = todos.map((x) => {
      if (x.id === id) {
        return { ...x, completed: !x.completed };
      } else {
        return x;
      }
    });
    setTodos(updatedCompleted);
  };

  return (
    <>
      <div>
        <h1>To Do Application</h1>
        <input
          type="text"
          placeholder="Enter Todo..."
          className="inputStyle"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        //   onKeyDown={handleEnter}
        />
        <button onClick={handleAdd}>ADD</button>

        <ul className="listsDiv">
          {optimisticTodos &&
            optimisticTodos.length > 0 &&
            optimisticTodos.map((ele) => {
              return (
                <li key={ele.id} className="lists">
                  {/* <input
                    type="checkbox"
                    checked={ele.completed}
                    onChange={() => toggleCompleted(ele.id)}
                  /> */}
                  {ele.completed ? <strike>{ele.text}</strike> : ele.text}
                  {/* <button onClick={() => handleDelete(ele.id)}>DELETE</button> */}
                  {ele.pending && <p>(Adding...)</p> }
                </li>
              );
            })}
        </ul>
        {/* <div className="listsDiv">
          {todos &&
            todos.length > 0 &&
            todos.map((ele) => {
              return (
                <div key={ele.id} className="lists">
                  <input
                    type="checkbox"
                    checked={ele.completed}
                    onChange={() => toggleCompleted(ele.id)}
                  />
                  {ele.completed ? <strike>{ele.text}</strike> : ele.text}
                  <button onClick={() => handleDelete(ele.id)}>DELETE</button>
                </div>
              );
            })}
        </div> */}
      </div>
    </>
  );
}

export default UseOptimistic1;

// UseOptimistic1.jsx:14 An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition.

// That warning is coming from React’s useOptimistic API design:

// ⚠️ React requires that optimistic updates happen inside a transition (startTransition) or an action (like a form action or useActionState callback).

// In your code, we directly called addOptimisticTodo(newTodo) in createTodo, so React complains.


// 🔹 Why startTransition?

// Optimistic updates are considered non-urgent (they might be rolled back).

// startTransition tells React: “run this update as a transition, not urgent UI”.

// That’s why React enforces wrapping, so it can handle rollback + concurrency correctly.

// ✅ With this change, the warning will disappear and your optimistic todo app will work smoothly.