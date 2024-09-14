import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://translation.googleapis.com/language/translate/v2',
});

const baseQueryExtended: BaseQueryFn = async (api, args, extraOptions) => {
  const result = await baseQuery(api, args, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["Translate"],
  endpoints: () => ({}),
});
