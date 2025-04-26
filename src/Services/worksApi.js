import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const worksApi = createApi({
  reducerPath: 'worksApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api/` }),
  endpoints: (builder) => ({
    getWorks: builder.query({
      query: () => 'works',
    }),
    getWorksByPeriod: builder.query({
      query: (period) => `works?period=${period}`,
    }),
  }),
});

export const {
  useGetWorksQuery,
  useGetWorksByPeriodQuery,
} = worksApi;
