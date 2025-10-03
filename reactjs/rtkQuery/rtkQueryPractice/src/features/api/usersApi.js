// 1. RTK Query API Slice (Data Fetching)
// This slice handles fetching users from a public API.


import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com/'}),
    endpoints: (builder) => ({
        // Query to fetch all users
        getUsers: builder.query({
            query: () => 'users',
        }),
        // Query to fetch a single user by ID
        getUserById: builder.query({
            query: (id) => `users/${id}`,
        }),
    })
})

// Auto-generated hooks
export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi;