import axios from "axios";
import { useQuery } from "react-query";

export interface Property {
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
};

type Response = {
    data: Property[],
    success:boolean
}
export const searchListing = async (city: string) => {
  const request = await axios.get<Response>(
    `/api/v1/properties?city=${city}`
    );
    
    

  const response: Response = request.data;

  return response;
};

export const fetchPost = (city: string) =>
axios.get<Property[]>(`/api/v1/properties?city=${city}`).then(res => res.data)


export const useFetch = (city: string) => {
  return useQuery("listing", () => searchListing(city));
};
