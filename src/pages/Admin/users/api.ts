import { ParamsModel } from '../../../shared/api-models';
import { apiClient } from '../../../utils/api-client';
import { ApiError } from '../../../utils/utlis';
import { UserInterface } from './utils';



export const api = {
  getUsers: async (params?: ParamsModel): Promise<UserInterface[]> => {
    try {
      const response = await apiClient.get<UserInterface[]>(`users`,params);
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
  updateUser: async (id:string|undefined,params?: ParamsModel): Promise<any> => {
    try {
      const response = await apiClient.put<any>('users', id,params);
      return response;
    } catch (err: any) {
      console.error('🚀 ~ addUser: ~ err:', err);
      throw new ApiError(`Failed to add User - ${err.message || err}`);
    }
  },
  
};


