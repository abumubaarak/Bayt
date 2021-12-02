import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
import ListingCard from "@components/ListingCard.component";
import Loading from "@components/Loading.component";
import { useUserWishlists } from "@hooks/useApi";
import TenantLayoutWrap from "@layouts/tenantLayoutwrap.layout";
import React from "react";

export default function Wishlist() {
   const { data: property, isError, isLoading, error } = useUserWishlists();
   return (
      <TenantLayoutWrap title='Wishlists'>
         <VStack w='100%' mt={10}>
            {isError && <Text>{error?.message}</Text>}

            {isLoading && <Loading />}

            <SimpleGrid
               sx={{
                  gridTemplateColumns:
                     "repeat(auto-fit, minmax(300px, 329px)) ",
               }}
               w='full'
               maxW='8xl'
               spacing='10'>
               <ListingCard data={property?.data!} isTetant={true} />
            </SimpleGrid>
         </VStack>
      </TenantLayoutWrap>
   );
}
