import { useQuery } from '@tanstack/react-query'
import React from 'react'

const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if(!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function Posts() {
    const { data, isLoading, isError, error } = useQuery({
       queryKey: ['posts'], // Unique key for this query
       queryFn: fetchPosts, // Function to fetch the data 
    });

    if(isLoading) return <p>Loading posts...</p>;
    if(isError) return <p>Error: {error.message}</p>;
  return (
    <div>
        <h2>Posts</h2>
        <ul>
            {data.map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    </div>
  )
}

export default Posts