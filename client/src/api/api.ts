import axios from "axios";
import {
   ListingDetails,
   Listings,
   ResponseArr,
   ResponseObj,
   TenantRequest,
   UserInfo,
} from "./apiType";
import { get, getWithCred } from "./requestType";

// / THIS ROUTE SHOULD BE PROTECTED

export const getTenentMesssage = async (id: string) => {
   return (
      await axios.get<any>(`/api/v1/tenents/${id}`, {
         withCredentials: true,
      })
   ).data;
};
export const declineTenentRequest = async (id: any) => {
   return (
      await axios.delete<any>(`/api/v1/tenents/${id}`, {
         withCredentials: true,
      })
   ).data;
};

export const acceptTenentRequest = async (id: any) => {
   return (
      await axios.put<any>(`/api/v1/tenents/${id}`, { withCredentials: true })
   ).data;
};

export const sendTenantMessage = async (payload: any) => {
   const { data } = await axios.post<any>(
      "/api/v1/tenents",
      { ...payload },
      { withCredentials: true }
   );

   return data;
};

export const removeWishlist = async (id: any) => {
   console.log(id.propertyId);
   const { data } = await axios.delete<any>(`/api/v1/wishlists/${id}`, {
      withCredentials: true,
   });

   return data;
};

export const addToWishlist = async (payload: any) => {
   const { data } = await axios.put<any>(
      "/api/v1/wishlists",
      { ...payload },
      { withCredentials: true }
   );

   return data;
};

export const updateUser = async (payload: any) => {
   const { data } = await axios.post<any>(
      "/api/v1/auth/update",
      { ...payload },
      { withCredentials: true }
   );

   return data;
};

export const getTenent = () => {
   return getWithCred<ResponseArr<TenantRequest>>(`tenents`);
};

export const getListing = (searchValue?: string) => {
   return get<ResponseArr<Listings>>(`properties?city=${searchValue}`);
};

export const getListingDetails = (id: string) => {
   return get<ResponseObj<ListingDetails>>(`properties/${id}`);
};

export const getLandlord = (id: string) => {
   return get<ResponseObj<UserInfo>>(`auth/getme/${id}`);
};

export const getUser = () => {
   return getWithCred<ResponseObj<UserInfo>>(`auth/getme`);
};
export const logout = async (): Promise<any> => {
   const { data } = await axios.get<any>(`/api/v1/auth/logout`);
   return data;
};
