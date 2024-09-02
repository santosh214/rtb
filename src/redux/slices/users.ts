import { createSlice } from "@reduxjs/toolkit";

export interface User {
    id: number | string;
    name: string;
    age: number;
    mailId: string,
}
export interface UserType {
    users: User[]
}
const initialState: UserType = {
    users: [{
        id: '1',
        name: 'Santosh',
        age: 27,
        mailId: 'santosh.k.singh@impetus.com'

    }]
}
export const UserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const newUser = {
                id: '11',
                ...action.payload
            }
            state.users = [...state.users, newUser]
        }
    }
})

export const { addUser } = UserSlice.actions
export default UserSlice.reducer