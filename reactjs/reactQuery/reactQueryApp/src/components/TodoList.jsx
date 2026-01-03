import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'

const fetchTodos = async () => {
    const response = fetch();
    if(!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function TodoList() {
    const queryClient = useQueryClient();

    // Fetch todos
    const { data, isLoading, isError } = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
        staleTime: 5000,
    });

    // Mutation with optimistic update
    // Mutation with optimistic update
  const addTodoMutation = useMutation({
    mutationFn: (newTodo) =>
      axios.post("/api/todos", newTodo).then((res) => res.data),

    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(["todos"]);

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old) => [
        ...old,
        { id: Math.random(), ...newTodo },
      ]);

      return { previousTodos };
    },

    onError: (_error, _newTodo, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });


    return (
    <div>
        <h2>Todo List</h2>

    </div>
  )
}

export default TodoList