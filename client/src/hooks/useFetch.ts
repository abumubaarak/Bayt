import axios from "axios";
import { useQuery } from "react-query";

export interface Property {
  _id:any
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
  slug:string
}

type Response = {
  data: Property[];
  success: boolean;
};
export const searchListing = async (searchValue?: string) => {
  const { data } = await axios.get<Response>(
    `/api/v1/properties?city=${searchValue}`
  );
  return data;
};
export const getListing = async (id?: string|unknown) => {
  const { data } = await axios.get<any>(
    `/api/v1/properties/${id}`
  );
  return data;
};

