import type { Action, ThunkAction } from "@reduxjs/toolkit";
import {   combineSlices,  configureStore } from "@reduxjs/toolkit";
import { usersApiSlice } from "@/lib/features/user/userAPISlice";
import  {userSlice}  from "@/lib/features/user/userSlice";
import {authSlice} from "@/lib/features/auth/authSlice"
import { createWrapper } from 'next-redux-wrapper';




const rootReducer = combineSlices(usersApiSlice, userSlice,authSlice);


export type RootState = ReturnType<typeof rootReducer>;


export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(usersApiSlice.middleware);
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;


export const wrapper = createWrapper(makeStore, { debug: true });


