import axios from "axios";
import {
   ListingDetails,
   Listings,
   Payment,
   PaymentCheckout,
   ResponseArr,
   ResponseObj,
   TenantMessage,
   UserInfo,
} from "./apiType";
import { get, getWithCred, postWithCred } from "./requestType";

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
   return getWithCred<ResponseArr<TenantMessage>>(`tenents`);
};

export const getListing = (searchValue?: string) => {
   return get<ResponseArr<Listings>>(`properties?city=${searchValue}`);
};

export const getOwnerListing = () => {
   return getWithCred<ResponseArr<Listings>>(`properties/owner`);
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

export const getUserMessages = (id: string) => {
   return getWithCred<ResponseArr<TenantMessage>>(`messages/${id}`);
};

export const getOwnerMessages = () => {
   return getWithCred<ResponseArr<TenantMessage>>(`messages`);
};

export const getUserConversation = (id: string) => {
   return getWithCred<ResponseArr<TenantMessage>>(`conversations/${id}`);
};

export const getUserPayments = () => {
   return getWithCred<ResponseArr<Payment>>(`payments`);
};

export const getSinglePayment = (id:string) => {
   return getWithCred<ResponseObj<Payment>>(`payments/${id}`);
};
export const paymentCheckout = (payload: any) => {
   return postWithCred<ResponseObj<PaymentCheckout>>("payments", payload);
};

export const sendMessage = async (payload: any) => {
   const { data } = await axios.post<any>(
      "/api/v1/conversations",
      { ...payload },
      { withCredentials: true }
   );

   return data;
};

export const logout = async (): Promise<any> => {
   const { data } = await axios.get<any>(`/api/v1/auth/logout`);
   return data;
};
