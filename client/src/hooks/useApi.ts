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
   getInsight,
   getLandlord,
   getListing,
   getListingDetails,
   getOwnerListing,
   getOwnerMessages,
   getSinglePayment,
   getTenent,
   getTenentMesssage,
   getUser,
   getUserConversation,
   getUserMessages,
   getUserPayments,
   getUserWishlists,
   paymentCheckout,
   removeWishlist,
   sendMessage,
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

export const useOwnerListing = () => {
   return useWrapper(["city"], () => getOwnerListing());
};

export const useListingDetails = (id: string) => {
   return useWrapper([id], () => getListingDetails(id));
};

export const useTenent = () => {
   return useWrapper(["pending-tenents"], () => getTenent());
};

export const useOwnerMessages = () => {
   return useWrapper(["messages"], () => getOwnerMessages());
};

export const useUserMessages = () => {
   return useWrapper(["messag"], () => getUserMessages("1234"));
};

export const useInsight = () => {
   return useWrapper(["insight"], () => getInsight());
};

export const usePaymentCheckout = () => {
   const client = useClient();

   return useMutation(paymentCheckout, {
      onMutate: () => {},
      onSettled: () => {
         // client.invalidateQueries(id);
      },
      onSuccess: () => {},
   });
};

export const useUserConversation = (id: string) => {
   return useWrapper([id], () => getUserConversation(id));
};

export const useUserPayments = () => {
   return useWrapper(["payments"], () => getUserPayments());
};
export const useUserWishlists = () => {
   return useWrapper(["wishlist"], () => getUserWishlists());
};

export const useSinglePayment = (id: string) => {
   return useWrapper([id], () => getSinglePayment(id));
};

export const useSendMessage = (id: string) => {
   const client = useClient();

   return useMutation(sendMessage, {
      onMutate: () => {},
      onSettled: () => {
         client.invalidateQueries(id);
      },
      onSuccess: () => {},
   });
};
