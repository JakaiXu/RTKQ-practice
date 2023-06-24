import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const stuApi = createApi({
  reducerPath: "stuApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api/" }),
  tagTypes: ["student"],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query() {
        return "students";
      },
      transformResponse(baseQueryReturnValue) {
        return baseQueryReturnValue.data;
      },
      providesTags: [{type:'student',id:'list'}],
    }),
    getStudentById: builder.query({
      query(id) {
        return `students/${id}`;
      },
      transformResponse(baseQueryReturnValue) {
        return baseQueryReturnValue.data;
      },
      keepUnusedDataFor: 20,
      providesTags:(id) => [{type:'student',id}]
    }),
    deleteStudents: builder.mutation({
      query(id) {
        return {
          url: `students/${id}`,
          method: "delete",
        };
      },
    }),
    createStudents: builder.mutation({
      query(stu) {
        return {
          url: "students",
          method: "post",
          body: { data: stu },
        };
      },
      invalidatesTags: ( stu) => [{ type: "student", id: "list" }],
    }),
    updateStudent: builder.mutation({
      query(stu) {
        return {
          url: `students/${stu.id}`,
          method: "put",
          body: {
            data: stu.attributes,
          },
        };
      },
      invalidatesTags: ( stu) => [{ type: "student", id: stu },{ type: "student", id: "list" }],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useCreateStudentsMutation,
  useDeleteStudentsMutation,
  useUpdateStudentMutation,
} = stuApi;
export default stuApi;
