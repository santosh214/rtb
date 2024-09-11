import React, { useCallback, useEffect, useState } from 'react';
import { UITable } from '../../../components/UIElements/Table';
import { TransactionColumn, TransactionList } from './utils';
import { api } from './api';
import { toast } from 'react-toastify';
import { getAdmin, getUserData } from '../../../utils/utlis';

export default function Transactions() {
  const [transactions, setTransaction] = useState<TransactionList[]>([]);
  useEffect(() => {
    getAllTransactions();

    return () => {};
  }, []);
  const getAllTransactions = async () => {
    try {
      const _transactions = await api.getAllTransaction();
      console.log('🚀 ~ getAllUsers ~ users:', _transactions);
      setTransaction(_transactions); // Set the user data correctly
    } catch (error) {
      console.error('🚀 ~ getAllUsers ~ error:', error);
      toast.error('Failed to fetch Users list');
    }
  };
  const filteredData = useCallback(() => {
    return transactions?.filter((tx) =>
      tx.user_id.toLowerCase().includes(getUserData().id.toLowerCase()),
    );
  }, [transactions]);

  return (
    <UITable columns={TransactionColumn} data={getAdmin()?transactions: filteredData() || []} route="" />
  );
}
