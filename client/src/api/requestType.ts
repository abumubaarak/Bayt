import axios from "@hooks/axios";
import { getCookie } from "@utils/utils";
export const userId = window.localStorage.getItem("access_token")
   ? window.localStorage.getItem("access_token")
   : getCookie("access_token");

export const setHeader = () => {
   const userId = window.localStorage.getItem("access_token")
      ? window.localStorage.getItem("access_token")
      : getCookie("access_token");
   return {
      authorization: `Bearer ${userId}`,
   };
};
export const getWithCred = async <T>(url: string): Promise<T> => {
   
   const { data } = await axios.get<T>(`/api/v1/${url}`, {
      headers: setHeader(),
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
      {
         headers: setHeader(),
      }
   );

   return data;
};
export const putWithCred = async <T>(
   endpoint: string,
   payload?: any
): Promise<T> => {
   const { data } = await axios.put<T>(
      `/api/v1/${endpoint}`,
      { ...payload },
      {
         headers: setHeader(),
      }
   );

   return data;
};

export const deleteWithCred = async <T>(endpoint: string): Promise<T> => {
   const { data } = await axios.delete<T>(`/api/v1/${endpoint}`, {
      headers: setHeader(),
   });

   return data;
};
