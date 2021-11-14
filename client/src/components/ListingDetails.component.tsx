import {
   Box,
   Grid,
   GridItem,
   HStack,
   SimpleGrid,
   VStack,
} from "@chakra-ui/layout";
import {
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   Image,
   Text,
   useDisclosure,
} from "@chakra-ui/react";
import { useListingDetails } from "@hooks/useApi";
import useToastMessage from "@hooks/useToastMessage";
import { ListingDetailsProps } from "@type/base";
import React, { FC, useEffect } from "react";
import { BiBath, BiBed, BiPolygon } from "react-icons/bi";
import OtherItem from "./OtherItem.component";

const ListingDetails: FC<ListingDetailsProps> = ({ id }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const { REACT_APP_BASE_URL_2: IMAGE_URL } = process.env;
   const toast = useToastMessage();

   const {
      data: propertyDetail,
      isLoading,
      isError,
   } = useListingDetails(id?.substring(1));

   useEffect(() => {
      if (id) {
         onOpen();
      }
   }, [id]);

   useEffect(() => {
      if (isError) {
         toast.error("Something went wrong");
      }
   }, [isError]);
   return (
      <Drawer size='md' isOpen={isOpen} placement='right' onClose={onClose}>
         <DrawerOverlay />
         <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader></DrawerHeader>
            <DrawerBody>
               <VStack w='full' alignItems='start'>
                  <Image
                     src={`${IMAGE_URL}${propertyDetail?.data.images[0]}`}
                     rounded='md'
                     height='250px'
                     shadow='md'
                     w='full'
                     objectFit='cover'
                     bgColor='red.400'
                  />
                  <Grid
                     w='full'
                     gap='5'
                     h='150px'
                     templateColumns='repeat(2,1fr)'>
                     <GridItem w='full'>
                        <Image
                           w='full'
                           h='150px'
                           src={`${IMAGE_URL}${propertyDetail?.data.images[1]}`}
                           rounded='md'
                           objectFit='cover'
                           shadow='md'
                           bgColor='purple'
                        />
                     </GridItem>
                     <GridItem w='full'>
                        <Image
                           w='full'
                           h='150px'
                           src={`${IMAGE_URL}${propertyDetail?.data.images[2]}`}
                           rounded='md'
                           objectFit='cover'
                           shadow='md'
                           bgColor='green.400'
                        />
                     </GridItem>
                  </Grid>
                  <Text fontSize='xl' color='gray.700' fontWeight='bold'>
                     {propertyDetail?.data?.name}
                  </Text>
                  <Text color='gray.600' fontWeight='semibold'>
                     {propertyDetail?.data?.propertyType}
                  </Text>
                   
                  <HStack className='font-sand' color='gray.800' spacing='6'>
                     <HStack spacing='1'>
                        <BiBed className='w-5 h-7' />
                        <Text>
                           {propertyDetail?.data?.avaliableBedroom} Bedroom
                        </Text>
                     </HStack>
                     <HStack spacing='1'>
                        <BiBath className='w-5 h-7' />
                        <Text>
                           {propertyDetail?.data?.avaliableBathroom} Bathroom
                        </Text>
                     </HStack>
                     <HStack spacing='0.5'>
                        <BiPolygon className='w-5 h-7' />
                        <Text fontWeight='medium' pl='1'>
                           {propertyDetail?.data?.propertySize}Sq
                           <Text as='sup'>ft</Text>
                        </Text>
                     </HStack>
                  </HStack>
                  <Text color='brand.500' fontWeight='bold' fontSize='xl'>
                     {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                     }).format(+propertyDetail?.data?.cost!)}
                  </Text>
                  <VStack pt='10px' w='full' spacing={5} alignItems='start'>
                     <VStack spacing='5' w='full' alignItems='start'>
                        <Text
                           className='font-railway'
                           fontSize='2xl'
                           color='gray.700'
                           fontWeight='semibold'>
                           Amenities
                        </Text>
                        <SimpleGrid w='full' minChildWidth='150px' spacingY={9}>
                           {propertyDetail?.data?.amenities.map(
                              (item: string, index: any) => (
                                 <OtherItem title={item} isAmenities={true} />
                              )
                           )}
                        </SimpleGrid>
                     </VStack>
                     <VStack spacing='5' w='full' alignItems='start'>
                        <Text
                           className='font-railway'
                           fontSize='2xl'
                           color='gray.700'
                           fontWeight='semibold'>
                           Rules
                        </Text>
                        <SimpleGrid w='full' minChildWidth='150px' spacingY={9}>
                           {propertyDetail?.data?.rules.map(
                              (item: string, index: any) => (
                                 <OtherItem title={item} isAmenities={false} />
                              )
                           )}
                        </SimpleGrid>
                     </VStack>
                     <Box>
                        <Text
                           className='font-railway'
                           fontSize='2xl'
                           color='gray.700'
                           fontWeight='semibold'>
                           Description
                        </Text>
                        <Text lineHeight='8'>
                           {propertyDetail?.data?.description}
                        </Text>
                     </Box>
                     <Box>
                        <Text
                           className='font-railway'
                           fontSize='2xl'
                           color='gray.700'
                           fontWeight='semibold'>
                           Location
                        </Text>
                        <Text>
                           {propertyDetail?.data?.address}
                           {propertyDetail?.data?.city}
                        </Text>
                     </Box>
                  </VStack>
               </VStack>
            </DrawerBody>

            <DrawerFooter>
               {/* <Button variant='outline' mr={3} onClick={onClose}>
                     Cancel
                  </Button>
                  <Button colorScheme='blue'>Save</Button> */}
            </DrawerFooter>
         </DrawerContent>
      </Drawer>
   );
};

export default ListingDetails;
