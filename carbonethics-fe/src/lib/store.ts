import { configureStore } from '@reduxjs/toolkit'
import { clientApi } from './services/client'
import { ticketApi } from './services/ticket'

export const makeStore = () => configureStore({
  reducer: {
    [clientApi.reducerPath]: clientApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(clientApi.middleware)
    .concat(ticketApi.middleware),
  
})

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']