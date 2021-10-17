import axios from "axios";

export const getWithCred = async <T>(
   url: string,
   valuee?: string
): Promise<T> => {
   const { data } = await axios.get<T>(`/api/v1/${url}`, {
      withCredentials: true,
   });
   return data;
};

export const get = async <T>(url: string, value?: string): Promise<T> => {
   const { data } = await axios.get<T>(`/api/v1/${url}`);
   return data;
};
