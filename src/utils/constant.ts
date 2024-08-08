import { DataRow } from "../components/UIElements/Table";

export const containerPadding = { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 };
export const segmentSpacing = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 };
export const sectionSpacing = { xs: 1, sm: 1, md: 2, lg: 3, xl: 4 };
export const elementSpacing = { xs: 0.5, sm: 1, md: 1, lg: 2, xl: 3 };

export const MenuList = [
    {
        id: '122',
        name: 'Home',
        route: '/dashboard'
    },
    {
        id: '123',
        name: 'Users',
        route: '/dashboard/users'
    },
    {
        id: '123',
        name: 'Add User',
        route: '/dashboard/users/add'
    },
    {
        id: '124',
        name: 'Items',
        route: '/dashboard/items'
    },
    {
        id: '125',
        name: 'Transaction',
        route: '/dashboard/transactions'
    },


]

export const dummyData: DataRow[] = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
    { id: 3, name: "Bob Johnson", age: 35 },
    { id: 4, name: "Alice Brown", age: 28 },
    { id: 5, name: "Charlie Wilson", age: 40 },
  ];