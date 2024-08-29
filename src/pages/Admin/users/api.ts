import { ParamsModel } from "../../../shared/api-models";
import { apiClient } from "../../../utils/api-client";
import { ApiError } from "../../../utils/utlis";

export const api = {
    getUsersImage: async (params?: ParamsModel) => {
        return await apiClient.get('users').then((x) => x).catch((err: any) => {
            console.log("🚀 ~ getUsersImage: ~ err:", err)
            
            throw new ApiError(`Failed to fetch Users List-${err}`);
        })
    }
}