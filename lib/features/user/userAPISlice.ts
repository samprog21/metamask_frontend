import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserGetApi, userQuery } from "@/interfaces/UserInterface";
import { baseUrl } from "@/config";
import { RootState } from "@/lib/store";


type getUser={
  id:string
}

export const usersApiSlice = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getUsers: build.query<UserGetApi[], getUser>({
      query: ({id}) => `$/users${id}`,
      transformResponse: (response: { results: UserGetApi[] }) => response.results,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Users", id }))
          : [{ type: "Users", id: "LIST" }],
    }),
    getFilteredUsers: build.query<UserGetApi[], userQuery>({
      query: (filters) => ({
        url: '/users',
        params: filters,
      }),
      transformResponse: (response: { results: UserGetApi[] }) => response.results,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Users", id }))
          : [{ type: "Users", id: "LIST" }],
    }),
    
    addUser: build.mutation<void, FormData>({
      query: (formData) => ({
        url: '/auth/register',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    loginUser: build.mutation<void, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: build.mutation<void, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    deleteUser: build.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Users", id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetFilteredUsersQuery,
  useAddUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
