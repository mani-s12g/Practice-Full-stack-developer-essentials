// 1. RTK Query API Slice (Data Fetching)
// This slice handles fetching users from a public API.


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    // endpoints is a function where you define the different API operations (like GET, POST, PUT, DELETE).
    endpoints: (builder) => ({
        // Query to fetch all users
        getUsers: builder.query({
            query: () => 'users',
            keepUnusedDataFor: 60, // default 60s - cache lifespan 60s, refetches auto later (old data- Garbage Collected)
            providesTags: ['User'], // mark cache as 'User
        }),
        // Query to fetch a single user by ID
        getUserById: builder.query({
            query: (id) => `users/${id}`,
        }),
        addUser: builder.mutation({
            query: (newUser) => ({
                url: '/users',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['User'], // tells RTKQ to re-fetch 'User' queries 
        }),

        // for posting, updating use mutations
        createPost: builder.mutation({
            query: (newPost) => ({
                url: '/posts',
                method: 'POST',
                body: newPost
            })
        }),
    }),
});

// Auto-generated hooks
export const { useGetUsersQuery, useGetUserByIdQuery, useCreatePostMutation } = usersApi;