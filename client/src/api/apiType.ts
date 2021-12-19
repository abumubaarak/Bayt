export type ListingInfo = {
   rules: string[];
   amenities: string[];
   images: string[];
   _id: string;
   name: string;
   city: string;
   address: string;
   propertySize: number;
   avaliableBedroom: number;
   roomSize: number;
   avaliableBathroom: number;
   propertyType: string;
   cost: number;
   postedOn: Date;
   description: string;
   owner_id: string;
   slug: string;
   __v: number;
};

export type UserInfo = {
   role: string;
   wishlist: string[];
   request: string[];
   _id: string;
   firstname: string;
   lastname: string;
   email: string;
   provider: string;
   socialID: string;
   __v: number;
   bio: string;
};

export type TenantMessage = {
   _id?: string;
   tenant_id: UserInfo;
   request?: string;
   owner_id: UserInfo;
   property_id: ListingInfo;
   message?: string;
   sender?: string;
   sentAt?: Date;
   __v?: number;
};

export type Payment = {
   _id: string;
   tenantID: string;
   propertyID: string;
   status: string;
   amount: string;
   checkoutID?: string;
   paidOn: Date;
   __v?: number;
};
export type PaymentCheckout = {
   id: string;
};

export interface Insight {
   stats: Stats[];
   properties: ListingInfo[];
   revenue: number[];
   tenantRequest: Owner_id[];
}

interface Owner_id {
   owner_id: TenantInfo;
   property_id: string;
   request: string;
   sentAt: string;
   tenant_id: string;
}
export interface TenantInfo {
   _id: string;
   firstname: string;
   lastname: string;
}

export type Stats = {
   _id?: null;
   revenue?: number;
   active?: Active[];
   occupied?: Occupied[];
};

export type Active = {
   _id: boolean;
   activeListing: number;
};

export type Occupied = {
   _id: boolean;
   occupied: number;
};

export type ResponseArr<T> = {
   success: boolean;
   data: T[];
};

export type ResponseObj<T> = {
   success: boolean;
   data: T;
};
