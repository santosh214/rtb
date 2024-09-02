import { ParamsModel } from '../../../../shared/api-models';
import { apiClient } from '../../../../utils/api-client';
import { ApiError } from '../../../../utils/utlis';

interface FoodItem {
  id: number;
  name: string;
  price: string;
}
export interface canteen_menu {
  today_menu: FoodItem[];
}

export const api = {
  getFoodItems: async (params?: ParamsModel): Promise<canteen_menu> => {
    console.log('params', params);
    try {
      const response = await apiClient.get<canteen_menu>(`canteen_menu`);
      return response; // Return the response directly
    } catch (err: any) {
      console.error('🚀 ~ getUsers: ~ err:', err);
      throw new ApiError(`Failed to fetch Users List - ${err.message || err}`);
    }
  },
  addFoodItems: async (params?: ParamsModel): Promise<any> => {
    try {
      const response = await apiClient.post<any>('canteen_menu', params);
      return response;
    } catch (err: any) {
      console.error('🚀 ~ addUser: ~ err:', err);
      throw new ApiError(`Failed to add User - ${err.message || err}`);
    }
  },
  updateFoodItem: async (params?: ParamsModel): Promise<any> => {
    // try {
    //   const response = await apiClient.put<any>('canteen_menu', params);
    //   return response;
    // } catch (err: any) {
    //   console.error('🚀 ~ addUser: ~ err:', err);
    //   throw new ApiError(`Failed to add User - ${err.message || err}`);
    // }
  },
};
