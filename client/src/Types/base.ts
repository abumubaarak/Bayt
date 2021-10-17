import { ReactNode } from "react";

export type Params = {
   slug: string;
};

export type ISearch = {
   city: string;
};

export type HeaderProps = {
   variant?: "home" | "others";
};

export type AuthModelProps = {
   isOpen: boolean;
   typeAuth: boolean;
   setType: (active?: boolean) => void;
   onClose(): any;
};

export type HomePageProps = {
   children: ReactNode;
   header?: any;
};

type Property = {
   _id: any;
   name: string;
   city: string;
   address: string;
   propertySize: number;
   avaliableBedroom: number;
   roomSize: number;
   avaliableBathroom: number;
   propertyType: string;
   rules: string[];
   amenities: string[];
   cost: number;
   description: string;
   images: string[];
   slug: string;
};

export type Response = {
   data: Property[];
   success: boolean;
};

export type ButtonProps = {
   children: ReactNode;
   handleModal?: any;
   loading?: boolean;
   type?: any;
};

export type TenantMessageComposeProps = {
   ownerId: string;
   propertyId: string;
   propertyDetail: any;
 };
export type UserInfoProps = {
   id: string;
   variant?: "light" | "dark";
};

export type WishListProps = {
   user: any;
   propertyId: string;
};
