import { ApiResponse, ParamsModel } from "../shared/api-models";



const baseURL = process.env.REACT_APP_API_URL;
export const apiClient = {
  get: async <T>(
    url: string,
    params?: ParamsModel | null,
    fetchOptions?: RequestInit
  ): Promise<T> => {
    // const queryParams = getQueryParams(params);
    // const fetchOpt = await handleOptions('GET', fetchOptions);
    const response = await fetch(`${baseURL}${url}`);
    
    // console.log("🚀 ~ response:",await response.json())
    // if (!response.ok) {
    //   if (response.status === 401) {
    //     // throw new Error(authError, {
    //     //   cause: '401',
    //     // });
    //   }
    //   if (response.status === 500) {
    //     throw new Error('Something went wrong');
    //   }
    //   const res = (await response.json()) as ApiResponse<null>;
    //   if (!res.success) {
    //     throw new Error(res.error_message);
    //   }
    // }
    // console.log("🚀 ~ res:",await response.json())
    const res = (await response.json()) as Promise<T>;
    console.log("🚀 ~ res:", res)

    return res as Promise<T>;
  },
  post: async <T>(
    url: string,
    body: any,
    fetchOptions?: RequestInit,
    isForm?: boolean
  ): Promise<T> => {
    // const sess: any = await getServerSession(authOptions);
    // if (sess === null)
    //   throw new Error(authError, {
    //     cause: '401',
    //   });
    const fetchOpt = await handleOptions('POST', body, fetchOptions, isForm);
    const response = await fetch(`${baseURL}${url}`, fetchOpt);
console.log("post",response)
    
    if (!response.ok) {
    //   if (response.status === 401) {
    //     throw new Error(authError, {
    //       cause: '401',
    //     });
    //   }
      if (response.status === 500) {
        throw new Error('Something went wrong');
      }
      const res = (await response.json()) as ApiResponse<null>; //
      if (!res.success) {
        throw new Error(res.error_message);
      }
    }
    const res = (await response.json()) as ApiResponse<T>;
    if (res.success === false) {
      throw new Error(res.error_message);
    }
    return res.data as Promise<T>;
  },
  put: async <T>(
    url: string,
    body: any,
    fetchOptions?: RequestInit,
    isForm?: boolean
  ): Promise<T> => {
    // const sess: any = await getServerSession(authOptions);
    // if (sess === null)
    //   throw new Error(authError, {
    //     cause: '401',
    //   });
    const fetchOpt = await handleOptions('PUT', body, fetchOptions, isForm);
    const response = await fetch(`${baseURL}${url}`, fetchOpt);
console.log("post",response)
    
    if (!response.ok) {
    //   if (response.status === 401) {
    //     throw new Error(authError, {
    //       cause: '401',
    //     });
    //   }
      if (response.status === 500) {
        throw new Error('Something went wrong');
      }
      const res = (await response.json()) as ApiResponse<null>; //
      if (!res.success) {
        throw new Error(res.error_message);
      }
    }
    const res = (await response.json()) as ApiResponse<T>;
    if (res.success === false) {
      throw new Error(res.error_message);
    }
    return res.data as Promise<T>;
  },
  delete: async <T>(url: string, body: any, fetchOptions?: RequestInit): Promise<T> => {
    // const sess: any = await getServerSession(authOptions);
    // if (sess === null)
    //   throw new Error(authError, {
    //     cause: '401',
    //   });
    const fetchOpt = await handleOptions('DELETE', body, fetchOptions);
    console.log(fetchOpt);
    const response = await fetch(`${baseURL}${url}`, fetchOpt);
    if (!response.ok) {
    //   if (response.status === 401) {
    //     throw new Error(authError, {
    //       cause: '401',
    //     });
    //   }
      if (response.status === 500) {
        throw new Error('Something went wrong');
      }
      const res = (await response.json()) as ApiResponse<null>;
      if (!res.success) {
        throw new Error(res.error_message);
      }
    }
    const res = (await response.json()) as ApiResponse<T>;
    return res as unknown as Promise<T>;
  },

};

const handleOptions = async (
    method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH',
    body?: any,
    fetchOptions?: RequestInit,
    isform?: boolean
  ) => {
    const retObj: RequestInit = {
      cache: fetchOptions?.cache,
      credentials: fetchOptions?.credentials,
      integrity: fetchOptions?.integrity,
      keepalive: fetchOptions?.keepalive,
      method: method,
      mode: fetchOptions?.mode,
      redirect: fetchOptions?.redirect,
      referrer: fetchOptions?.referrer,
      referrerPolicy: fetchOptions?.referrerPolicy,
      signal: fetchOptions?.signal,
      window: fetchOptions?.window,
    };
    if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && isform === true) {
      retObj.body = body;
    
    } else {
      if (method === 'POST' || method === 'PUT' || method === 'DELETE' || method === 'PATCH')
        retObj.body = JSON.stringify(body);
      if (fetchOptions?.headers)
        retObj.headers = {
          ...fetchOptions.headers,
        };
      else
        retObj.headers = {
          'Content-Type': 'application/json',
        };
    }
    return retObj;
  };