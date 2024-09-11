import { ParamsModel } from '../../../shared/api-models';
import { apiClient } from '../../../utils/api-client';
import { ApiError } from '../../../utils/utlis';
import { TransactionList } from './utils';




export const api = {
  getAllTransaction: async (params?: ParamsModel): Promise<TransactionList[]> => {
    try {
      const response = await apiClient.get<TransactionList[]>(`transactions`,params);
      return response; // Return the response directly
    } catch (err: any) {
      console.error('🚀 ~ transactions: ~ err:', err);
      throw new ApiError(`Failed to fetch transactions List - ${err.message || err}`);
    }
  },
  addTransaction: async (params?: TransactionList): Promise<any> => {
    try {
      const response = await apiClient.post<any>('transactions', params);
      return response;
    } catch (err: any) {
      console.error('🚀 ~ addUser: ~ err:', err);
      throw new ApiError(`Failed to add transaction- ${err.message || err}`);
    }
  },
  
};


