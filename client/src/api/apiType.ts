export type Listings = {
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
   description: string;
   owner_id: string;
   slug: string;
   __v: number;
};

export type ListingDetails = {
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
   tenant_id: string;
   request?: string;
   owner_id: string;
   property_id: string;
   message?: string;
   sender?: string;
   sentAt?: Date;
   __v?: number;
};

export type ResponseArr<T> = {
   success: boolean;
   data: T[];
};

export type ResponseObj<T> = {
   success: boolean;
   data: T;
};
