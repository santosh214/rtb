import { ParamsModel } from '../../../shared/api-models';
import { apiClient } from '../../../utils/api-client';
import { ApiError } from '../../../utils/utlis';
import { Item } from './utils/model';




export const api = {
  getItems: async (params?: ParamsModel): Promise<Item[]> => {
    try {
      const response = await apiClient.get<Item[]>(`items`,params);
      return response; // Return the response directly
    } catch (err: any) {
      console.error('🚀 ~ getUsers: ~ err:', err);
      throw new ApiError(`Failed to fetch Users List - ${err.message || err}`);
    }
  },
  addItem: async (params?: ParamsModel): Promise<any> => {
    try {
      const response = await apiClient.post<any>('items', params);
      return response;
    } catch (err: any) {
      console.error('🚀 ~ addUser: ~ err:', err);
      throw new ApiError(`Failed to add User - ${err.message || err}`);
    }
  },
  updateItem: async (id:string|undefined,params?: ParamsModel): Promise<any> => {
    try {
      const response = await apiClient.put<any>('items', id,params);
      return response;
    } catch (err: any) {
      console.error('🚀 ~ addUser: ~ err:', err);
      throw new ApiError(`Failed to add User - ${err.message || err}`);
    }
  },
  
};


