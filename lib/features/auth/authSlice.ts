import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserGetApi } from '@/interfaces/UserInterface';
import { RootState } from '@/lib/store';

interface AuthState {
  user: UserGetApi | null;
  token:string;
  isAuthenticated: boolean;
  showLogin: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token:'',
  isAuthenticated: false,
  showLogin:false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
      state.token= action.payload.tokens.access.token;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    showLoginPage: (state) => {
      state.showLogin = true;
    },
    showSignupPage: (state) => {
      state.showLogin = false;
    },
  },
});

export const { setUser, clearUser, showLoginPage, showSignupPage } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectShowLogin = (state: RootState) => state.auth.showLogin;

export default authSlice.reducer;

