import { ParamsModel } from '../../../shared/api-models';
import { apiClient } from '../../../utils/api-client';
import { ApiError } from '../../../utils/utlis';


interface User {
  id: number;
  name: string;
  email: string;
}

export const api = {
  getUsers: async (params?: ParamsModel): Promise<User[]> => {
    console.log("params",params)
    try {
      const response = await apiClient.get<User[]>(`users`);
      return response; // Return the response directly
    } catch (err: any) {
      console.error('🚀 ~ getUsers: ~ err:', err);
      throw new ApiError(`Failed to fetch Users List - ${err.message || err}`);
    }
  },
  addUser: async (params?: ParamsModel): Promise<any> => {
    try {
      const response = await apiClient.post<any>('users', params);
      return response;
    } catch (err: any) {
      console.error('🚀 ~ addUser: ~ err:', err);
      throw new ApiError(`Failed to add User - ${err.message || err}`);
    }
  },
  updateUser: async (params?: ParamsModel): Promise<any> => {
    try {
      const response = await apiClient.put<any>('users', params);
      return response;
    } catch (err: any) {
      console.error('🚀 ~ addUser: ~ err:', err);
      throw new ApiError(`Failed to add User - ${err.message || err}`);
    }
  },
  
};
