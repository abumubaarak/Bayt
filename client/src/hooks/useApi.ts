import axios from "axios";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import {
  acceptTenentRequest,
  declineTenentRequest,
  getTenent,
  getTenentMesssage,
} from "../api";

export interface Property {
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
}

type Response = {
  data: Property[];
  success: boolean;
};

const useClient = () => useQueryClient();

const useApi = () => {};
export const searchListing = async (searchValue?: string) => {
  const { data } = await axios.get<Response>(
    `/api/v1/properties?city=${searchValue}`
  );
  return data;
};
export const getListing = async (id?: string | unknown) => {
  const { data } = await axios.get<any>(`/api/v1/properties/${id}`);

  return data;
};

export const useUser = () => {
  return useQuery(["getme"], () =>
    axios
      .get<any>(`/api/v1/auth/getme`, { withCredentials: true })
      .then((res) => res.data)
  );
};

export const useOwner = (id: any) => {
  return useQuery([id], () =>
    axios.get<any>(`/api/v1/auth/getme?id=${id}`).then((res) => res.data)
  );
};

export const useOwnerV2 = () => {
  return useMutation((id) =>
    axios.get<any>(`/api/v1/auth/getme?id=${id}`).then((res) => res.data)
  );
};
const updateUser = async (payload: any) => {
  const { data } = await axios.post<any>(
    "/api/v1/auth/update",
    { ...payload },
    { withCredentials: true }
  );

  return data;
};
export const useUpdate = () => {
  const client = useClient();

  return useMutation(["updateProfile"], updateUser, {
    onSuccess: () => {
      client.invalidateQueries("getme");
    },
  });
};
const createTenent = async (payload: any) => {
  const { data } = await axios.post<any>(
    "/api/v1/tenents",
    { ...payload },
    { withCredentials: true }
  );

  return data;
};

export const useCreateTenent = () => {
  return useMutation(["message"], createTenent);
};

const addToWishlist = async (payload: any) => {
  const { data } = await axios.put<any>(
    "/api/v1/wishlists",
    { ...payload },
    { withCredentials: true }
  );

  return data;
};

const removeWishlist = async (id: string) => {
  const { data } = await axios.delete<any>(`/api/v1/wishlists/${id}`, {
    withCredentials: true,
  });

  return data;
};

export const useWishList = () => {
  const client = useClient();

  return useMutation(["wishlist"], addToWishlist, {
    onMutate: () => {},
    onSuccess: () => {
      client.invalidateQueries("getme");
    },
  });
};

export const useRemoveWishList = (id: string) => {
  const client = useClient();

  return useMutation(["wishlist"], () => removeWishlist(id), {
    onMutate: () => {},
    onSuccess: () => {
      client.invalidateQueries("getme");
    },
  });
};
export const useTenentMessage = (id: string) => {
  return useQuery([id], () => getTenentMesssage(id));
};

export const useTenent = () => {
  return useQuery(["pending-tenents"], () => getTenent());
};

export const useDeclineTenentRequest = () => {
  const client = useClient();

  return useMutation((id) => declineTenentRequest(id), {
    onMutate: () => {},
    onSettled: () => {
      client.invalidateQueries("pending-tenents");
    },
  });
};

export const useAceptTenentRequest = () => {
  const client = useClient();

  return useMutation((id) => acceptTenentRequest(id), {
    onMutate: () => {},
    onSettled: () => {
      client.invalidateQueries("pending-tenents");
    },
  });
};

export const logout = async (): Promise<any> => {
  const { data } = await axios.get<any>(`/api/v1/auth/logout`);
  return data;
};
