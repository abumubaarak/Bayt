import { ListingInfo } from "@api/apiType";
import { Box, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { formatCurrency } from "@utils/utils";
import React from "react";
import { useHistory } from "react-router";
import TimeAgo from "react-timeago";
export default function InsightListing({
   property,
}: {
   property: ListingInfo;
}) {
   const history = useHistory();
   
   return (
      <HStack
         onClick={() => history.push("listings")}
         cursor='pointer'
         alignItems='start'
         w='full'
         mt='5'
         spacing='4'>
         <Box
            bgImage={`url(${property?.images[0]})`}
            h='24'
            rounded='lg'
            shadow='sm'
            w={20}
            bgSize='cover'
            bgRepeat='no-repeat'
         />
         <VStack
            h='100'
            flex='1'
            spacing='1'
            justifyContent='flex-start'
            alignItems='flex-start'>
            <Text
               noOfLines={1}
               fontWeight='semibold'
               fontFamily='heading'
               fontSize='md'>
               {property.name}
            </Text>
            <Text fontSize='sm' fontWeight='semibold' color='gray.500'>
               {property.city}
            </Text>
            <Text fontSize='sm' color='gray.600'>
               {property.avaliableBedroom} Bedroom
            </Text>
            <HStack w='full'>
               <Text fontSize='sm' fontWeight='semibold' color='brand.700'>
                  {formatCurrency(property.cost.toString())}
               </Text>
               <Spacer />
               <Text
                  noOfLines={1}
                  fontSize='sm'
                  fontWeight='medium'
                  color='gray.700'>
                  <TimeAgo className='line' date={property.postedOn} />
               </Text>
            </HStack>
         </VStack>
      </HStack>
   );
}
