import { Box, HStack, Td, Text, VStack } from "@chakra-ui/react";
import { useListingDetails } from "@hooks/useApi";
import React from "react";
type Props = {
   propertyId: string;
};
const PaymentDescription = ({ propertyId }: Props) => {
 
   const { data: propertyDetails } = useListingDetails(propertyId);
   return (
      <Td color='black'>
         <HStack w='full'>
            <Box
               bgImage={`url(${propertyDetails?.data.images[0]})`}
               rounded='md'
               w='70px'
               h='55px'
               bgSize='cover'
               bgRepeat='no-repeat'
            />
            <VStack alignItems='start' spacing='0'>
               <Text fontWeight='semibold' color='black'>
                  {propertyDetails?.data.propertyType}
               </Text>
               <Text noOfLines={1}>
                  {`Payment for ${propertyDetails?.data.name ?? " "} at ${propertyDetails?.data.address ?? " "}`}
               </Text>
            </VStack>
         </HStack>
      </Td>
   );
};

export default PaymentDescription;
