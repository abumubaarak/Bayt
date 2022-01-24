import axios from "@hooks/axios";
import {
   Insight,
   ListingInfo,
   Payment,
   PaymentCheckout,
   ResponseArr,
   ResponseObj,
   TenantMessage,
   UserInfo,
} from "./apiType";
import {
   deleteWithCred,
   get,
   getWithCred,
   postWithCred,
   putWithCred,
} from "./requestType";

export const getTenentMesssage = async (id: string) => {
   return getWithCred<ResponseArr<any>>(`tenents/${id}`);
};

export const declineTenentRequest = async (id: any) => {
   return deleteWithCred<ResponseObj<any>>(`tenents/${id}`);
};

export const acceptTenentRequest = async (id: any) => {
   return putWithCred<ResponseObj<any>>(`tenents/${id}`);
};

export const sendTenantMessage = async (payload: any) => {
   return postWithCred<ResponseObj<any>>("tenents", { ...payload });
};

export const removeWishlist = async (id: any) => {
   return deleteWithCred<ResponseObj<any>>(`wishlists/${id}`);
};

export const addToWishlist = async (payload: any) => {
   return putWithCred<ResponseObj<any>>("wishlists", { ...payload });
};

export const updateUser = async (payload: any) => {
   return postWithCred<ResponseObj<any>>("auth/update", { ...payload });
};

export const getTenent = () => {
   return getWithCred<ResponseArr<TenantMessage>>(`tenents`);
};

export const getListing = (searchValue?: string) => {
   return get<ResponseArr<ListingInfo>>(`properties?city=${searchValue}`);
};

export const getOwnerListing = () => {
   return getWithCred<ResponseArr<ListingInfo>>(`properties/owner`);
};

export const getListingDetails = (id: string) => {
   return get<ResponseObj<ListingInfo>>(`properties/${id}`);
};

export const getLandlord = (id: string) => {
   return get<ResponseObj<UserInfo>>(`auth/getme/${id}`);
};

export const getUser = () => {
   return getWithCred<ResponseObj<UserInfo>>(`auth/user`);
};

export const getMessages = () => {
   return getWithCred<ResponseArr<TenantMessage>>(`messages`);
};

export const getUserConversation = (id: string) => {
   return getWithCred<ResponseArr<TenantMessage>>(`conversations/${id}`);
};

export const getInsight = () => {
   return getWithCred<ResponseObj<Insight>>(`insights`);
};

export const getUserPayments = () => {
   return getWithCred<ResponseArr<Payment>>(`payments`);
};

export const getUserWishlists = () => {
   return getWithCred<ResponseArr<ListingInfo>>(`wishlists`);
};
export const getSinglePayment = (id: string) => {
   return getWithCred<ResponseObj<Payment>>(`payments/${id}`);
};
export const paymentCheckout = (payload: any) => {
   return postWithCred<ResponseObj<PaymentCheckout>>("payments", payload);
};

export const sendMessage = async (payload: any) => {
   // const { data } = await axios.post<any>(
   //    "/api/v1/conversations",
   //    { ...payload },
   //    { withCredentials: true }
   // );
   return postWithCred<ResponseObj<any>>("conversations", payload);

   //return data;
};

export const logout = async (): Promise<any> => {
   const { data } = await axios.get<any>(`/api/v1/auth/logout`);
   return data;
};
