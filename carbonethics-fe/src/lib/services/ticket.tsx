import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { TicketFormType, TicketResponse } from "./types";

export const ticketApi = createApi({
  reducerPath: "ticketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders(headers) {
      const token = Cookies.get("access-token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getTickets: build.query<TicketResponse[], number>({
      query: (id) => ({
        url: `tickets/?client=${id}`,
        method: "GET",
      }),
    }),
    createTiket: build.mutation<unknown, TicketFormType>({
      query: ({ title, description, client }) => ({
        url: `tickets/`,
        method: "POST",
        body: {
          title,
          description,
          client
        },
      }),
    }),
  }),
});

export const { useGetTicketsQuery, useCreateTiketMutation } = ticketApi;
