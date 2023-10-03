import { apiSlice } from "./apislice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginStaff: builder.mutation({
      query: (credentials) => ({
        url: "/api/loginStaff",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginStaffMutation } = authApiSlice;
