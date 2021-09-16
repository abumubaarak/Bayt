import axios from "axios";

const getRequest = (url: any) =>
  axios.get<any>(`/api/v1/${url}`, { withCredentials: true });

export const getTenent = async () => {
  return (await getRequest("/tenents")).data;
};

export const getTenentMesssage = async (id: string) => {
  return (await getRequest(`/tenents/${id}`)).data;
};
export const declineTenentRequest = async (id: any) => {
  return (
    await axios.delete<any>(`/api/v1/tenents/${id}`, { withCredentials: true })
  ).data;
};

export const acceptTenentRequest = async (id: any) => {
  return (
    await axios.put<any>(`/api/v1/tenents/${id}`, { withCredentials: true })
  ).data;
};
