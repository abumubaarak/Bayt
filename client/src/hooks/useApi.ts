import {
   useMutation,
   useQuery,
   useQueryClient,
   UseQueryResult,
} from "react-query";
import {
   acceptTenentRequest,
   addToWishlist,
   declineTenentRequest,
   getLandlord,
   getListing,
   getListingDetails,
   getTenent,
   getTenentMesssage,
   getUser,
   removeWishlist,
   sendTenantMessage,
   updateUser,
} from "../api/api";

const useClient = () => useQueryClient();

const useWrapper = <T>(
   key: any,
   fn: () => Promise<T>
): UseQueryResult<T, Error> => {
   return useQuery<T, Error, T>(key, () => fn());
};

export const useUpdate = () => {
   const client = useClient();

   return useMutation(["updateProfile"], updateUser, {
      onSuccess: () => {
         client.invalidateQueries("getme");
      },
   });
};

export const useTenantMessage = () => {
   const client = useClient();

   return useMutation(["message"], sendTenantMessage, {
      onSuccess: () => {
         client.invalidateQueries("getme");

         client.invalidateQueries("pending-tenents");
      },
   });
};

export const useWishList = () => {
   const client = useClient();

   return useMutation(addToWishlist, {
      onMutate: () => {},
      onSuccess: () => {
         client.invalidateQueries("getme");
      },
   });
};

export const useRemoveWishList = () => {
   const client = useClient();

   return useMutation((id) => removeWishlist(id), {
      onMutate: () => {},
      onSuccess: () => {
         client.invalidateQueries("getme");
      },
   });
};
export const useTenentMessage = (id: string) => {
   return useQuery([id], () => getTenentMesssage(id));
};

export const useDeclineTenentRequest = () => {
   const client = useClient();

   return useMutation((id: string) => declineTenentRequest(id), {
      onMutate: () => {},
      onSettled: () => {
         client.invalidateQueries("pending-tenents");
      },
   });
};

export const useAceptTenentRequest = () => {
   const client = useClient();

   return useMutation((id: string) => acceptTenentRequest(id), {
      onMutate: () => {},
      onSettled: () => {
         client.invalidateQueries("pending-tenents");
      },
   });
};

export const useLandlord = (id: any) => {
   return useWrapper([id], () => getLandlord(id));
};

export const useUser = () => {
   return useWrapper(["getme"], () => getUser());
};

export const useListing = (city: string) => {
   return useWrapper([city], () => getListing(city));
};

export const useListingDetails = (id: string) => {
   return useWrapper([id], () => getListingDetails(id));
};

export const useTenent = () => {
   return useWrapper(["pending-tenents"], () => getTenent());
};
