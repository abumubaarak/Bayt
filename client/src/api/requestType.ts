import axios from "@api/axios";

export const getWithCred = async <T>(endpoint: string): Promise<T> => {
   const { data } = await axios.get<T>(endpoint, {
      withCredentials: true,
   });
   return data;
};

export const get = async <T>(endpoint: string): Promise<T> => {
   const { data } = await axios.get<T>(endpoint);
   return data;
};

export const postWithCred = async <T>(
   endpoint: string,
   payload: any
): Promise<T> => {
   const { data } = await axios.post<T>(
      endpoint,
      { ...payload },
      { withCredentials: true }
   );

   return data;
};
