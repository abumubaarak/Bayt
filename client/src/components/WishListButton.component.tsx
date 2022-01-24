import { Button } from "@chakra-ui/react";
import { useRemoveWishList, useWishList } from "@hooks/useApi";
import useToastMessage from "@hooks/useToastMessage";
import { WishListProps } from "@type/base";
import React, { FC, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { UseMutationResult } from "react-query";

const handleWishList = (
   isSaved: boolean | undefined,
   deleteWishlist: UseMutationResult<any, unknown, any, void>,
   wishlist: UseMutationResult<any, unknown, any, void>,
   propertyId: string
) => {
   if (isSaved) {
       deleteWishlist.mutate(propertyId);
   } else {
      wishlist.mutate({
         propertyId,
      });
   }
};

const WishListButton: FC<WishListProps> = ({ propertyId, user }) => {
   const wishlist = useWishList();
   const deleteWishlist = useRemoveWishList();
   const toast = useToastMessage();

    const isSaved: boolean = user?.wishlist.some(
      (item: string, index: any) => propertyId === item
   );

   useEffect(() => {
      if (wishlist.isSuccess) {
         toast.success("Property added to wishlist");
      }
   }, [wishlist.isSuccess]);

   useEffect(() => {
      if (deleteWishlist.isSuccess) {
         toast.success("Property removed from wishlist");
      }
   }, [deleteWishlist.isSuccess]);

   useEffect(() => {
      if (wishlist.isError) {
         toast.error("Unable to add property to wishlist");
      }
   }, [wishlist.isError]);

   useEffect(() => {
      if (deleteWishlist.isError) {
         toast.error("Unable to remove wishlist");
      }
   }, [deleteWishlist.isError]);

   return (
      <div>
         <Button
            size='md'
            borderRadius='full'
            shadow='lg'
            bg='white'
            disabled={user?._id ? false : true}
            onClick={() =>
               handleWishList(isSaved, deleteWishlist, wishlist, propertyId)
            }
            m={3}
            isLoading={wishlist.isLoading}
            fontWeight='semibold'
            leftIcon={
               isSaved ? (
                  <BsFillHeartFill className='text-red-500' />
               ) : (
                  <AiOutlineHeart />
               )
            }>
            {isSaved ? "Saved" : "Save"}
         </Button>
      </div>
   );
};

export default WishListButton;
