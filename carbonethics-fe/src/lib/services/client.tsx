import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginFormType, RegisterFormType, Token } from './types'
import Cookies from 'js-cookie';
const refreshToken = Cookies.get("refresh-token");

export const clientApi = createApi({
    reducerPath: 'clientApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
    endpoints: (build) => ({
      login: build.mutation<Token, LoginFormType>({
        query: ({username, password}) => ({
          url: `login/`,
          method: 'POST',
          body: {
            username, 
            password
          },
        }),
      }),
      refreshToken: build.mutation<Token, null>({
        query: () => ({
          url: `login/refresh/`,
          method: 'POST',
          body: {
            refresh: refreshToken, 
          },
        }),
      }),
      register: build.mutation<Token, RegisterFormType>({
        query: ({username, password, email}) => ({
          url: `register/`,
          method: 'POST',
          body: {
            username, 
            email,
            password
          },
        }),
      }),
    }),
  })

export const { useLoginMutation, useRegisterMutation, useRefreshTokenMutation } = clientApi