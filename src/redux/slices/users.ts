import { createSlice } from '@reduxjs/toolkit';
import { UserInterface } from '../../pages/Admin/users/utils';


export interface UserType {
  users: UserInterface[];
}
const initialState: UserType = {
  users: [
    {
      id: '1',
      name: 'Santosh',
      email: 'santosh.k.singh@impetus.com',
      amount:'0',
      password:'password',
      role:'admin'
    },
  ],
};
export const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newUser = {
        id: '11',
        ...action.payload,
      };
      state.users = [...state.users, newUser];
    },
  },
});

export const { addUser } = UserSlice.actions;
export default UserSlice.reducer;
