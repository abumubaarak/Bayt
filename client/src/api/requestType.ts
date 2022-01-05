import axios from "axios";

export const getWithCred = async <T>(url: string): Promise<T> => {
   const { data } = await axios.get<T>(`/api/v1/${url}`, {
      withCredentials: true,
   });
   return data;
};

export const get = async <T>(url: string): Promise<T> => {
   const { data } = await axios.get<T>(`/api/v1/${url}`);
   return data;
};

export const postWithCred = async <T>(
   endpoint: string,
   payload: any
): Promise<T> => {
   const { data } = await axios.post<T>(
      `/api/v1/${endpoint}`,
      { ...payload },
      { withCredentials: true }
   );

   return data;
};
