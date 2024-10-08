import { Column } from "../../../components/UIElements/Table";

export const userColumns: Column[] = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'amount', label: 'Amount' }
];


export type UserInterface = {
    id: string;
    name: string;
    employeeId?: string;
    email: string;
    amount: string;
    password: string;
    role: string;
  };