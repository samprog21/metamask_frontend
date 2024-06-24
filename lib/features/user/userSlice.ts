import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaseUser } from "@/interfaces/UserInterface";

interface userState {
  globaluser: BaseUser[];
}

const initialState: userState = {
  globaluser: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setGlobaluser(state, action: PayloadAction<BaseUser[]>) {
      state.globaluser = action.payload;
    },
  },
});

export const { setGlobaluser } = userSlice.actions;
export default userSlice.reducer;