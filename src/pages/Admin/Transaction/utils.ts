export interface TransactionList {
    id: string;
    user_id: string;
    price: number;
    date: Date;
    item_name: string;
  }
  
  export const TransactionColumn = [
    { id: 'id', label: 'ID' },
    { id: 'user_id', label: 'User ID' },
    { id: 'price', label: 'Price' },
    { id: 'date', label: 'Date' },
    { id: 'item_name', label: 'Item Name' }
  ];
  