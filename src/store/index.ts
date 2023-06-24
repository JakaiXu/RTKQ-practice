import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import stuApi from "./stuApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
export const store = configureStore({
  reducer: {
    [stuApi.reducerPath]: stuApi.reducer,
  },
 middleware:getDefaultMiddleware().concat(stuApi.middleware)
});
setupListeners(store.dispatch)

export * from './stuApi'