export interface ApiResponse<T> {
    data: T;
    success: boolean;
    error_message: string;
  }
  export interface ParamsModel {
    [key: string]: string | number | boolean;
  }
  