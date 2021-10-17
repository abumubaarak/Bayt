import {
   Box,
   Flex,
   Grid,
   GridItem,
   HStack,
   Image,
   SimpleGrid,
   Tag,
   TagLabel,
   Text,
   VStack,
} from "@chakra-ui/react";
import Header from "@components/Header.component";
import Loading from "@components/Loading.component";
import MessageCompose from "@components/MessageCompose.component";
import OtherItem from "@components/OtherItem.component";
import WishListButton from "@components/WishListButton.component";
import { useListingDetails, useUser } from "@hooks/useApi";
import SlideUp from "@transition/SlideUp.transition";
import React from "react";
import { BiBath, BiBed, BiPolygon } from "react-icons/bi";
import { useLocation } from "react-router-dom";

const ListingDetailsPage = () => {
   const { REACT_APP_BASE_URL_2: IMAGE_URL } = process.env;
   const { state: id } = useLocation<string>();
   const { data: propertyDetail, isLoading, isError } = useListingDetails(id);

   const propertyDetails = propertyDetail?.data;

   const { data: user } = useUser();

   return (
      <>
         <Header />
         <SlideUp setMarginBottom={true}>
            <Box mx='auto' mt={5} maxW='5xl' w='full'>
               {isLoading && <Loading />}
               {propertyDetail && (
                  <VStack spacing='7' w='full' alignItems='start'>
                     <SimpleGrid
                        columns={3}
                        w='full'
                        templateRows='repeat(2,225px)'
                        h={450}
                        spacing={2}>
                        <GridItem rowSpan={2} colSpan={2}>
                           <Box
                              bgImage={`url(${IMAGE_URL}${propertyDetails?.images[2]})`}
                              roundedTopLeft='2xl'
                              roundedBotomLeft='2xl'
                              h='full'
                              bgSize='cover'
                              bgPos='center'
                              bgRepeat='no-repeat'>
                              <Tag
                                 size='md'
                                 borderRadius='full'
                                 shadow='md'
                                 bg='white'
                                 m={3}
                                 p={2}
                                 fontWeight='semibold'>
                                 <TagLabel>
                                    {propertyDetails?.propertyType}
                                 </TagLabel>
                              </Tag>
                           </Box>
                        </GridItem>
                        <GridItem rowSpan={1} colSpan={1}>
                           <Flex
                              bgImage={`url(${IMAGE_URL}${propertyDetails?.images[1]})`}
                              roundedTopRight='2xl'
                              justifyContent='flex-end'
                              boxSize='full'
                              bgSize='cover'
                              bgPos='center'
                              bgRepeat='no-repeat'>
                              <WishListButton
                                 propertyId={propertyDetails!._id}
                                 user={user}
                              />
                           </Flex>
                        </GridItem>
                        <GridItem rowSpan={1} colSpan={1}>
                           <Image
                              src={`${IMAGE_URL}${propertyDetails?.images[0]}`}
                              boxSize='full'
                              roundedBottomRight='2xl'
                              shadow='md'
                              fit='cover'
                           />
                        </GridItem>
                     </SimpleGrid>

                     <Grid w='full' gap='2' templateColumns='repeat(3,1fr)'>
                        <GridItem colSpan={2}>
                           <VStack spacing={7} w='full' alignItems='start'>
                              <VStack spacing='2' alignItems='start'>
                                 <Text
                                    className='font-railway'
                                    fontSize='2xl'
                                    color='gray.700'
                                    fontWeight='semibold'>
                                    {propertyDetails?.name}
                                 </Text>
                                 <Text
                                    className='font-sand'
                                    fontSize='lg'
                                    color='gray.700'
                                    fontWeight='bold'>
                                    ${propertyDetails?.cost}/year
                                 </Text>

                                 <HStack
                                    className='font-sand'
                                    color='gray.800'
                                    spacing='6'>
                                    <HStack spacing='1'>
                                       <BiBed className='w-5 h-7' />
                                       <Text>
                                          {propertyDetails?.avaliableBedroom}{" "}
                                          Bedroom
                                       </Text>
                                    </HStack>
                                    <HStack spacing='1'>
                                       <BiBath className='w-5 h-7' />
                                       <Text>
                                          {propertyDetails?.avaliableBathroom}{" "}
                                          Bathroom
                                       </Text>
                                    </HStack>
                                    <HStack spacing='0.5'>
                                       <BiPolygon className='w-5 h-7' />
                                       <Text fontWeight='medium' pl='1'>
                                          {propertyDetails?.propertySize}Sq
                                          <Text as='sup'>ft</Text>
                                       </Text>
                                    </HStack>
                                 </HStack>
                              </VStack>

                              <VStack spacing='5' w='full' alignItems='start'>
                                 <Text
                                    className='font-railway'
                                    fontSize='2xl'
                                    color='gray.700'
                                    fontWeight='semibold'>
                                    Amenities
                                 </Text>
                                 <SimpleGrid
                                    w='full'
                                    minChildWidth='300px'
                                    spacingY={9}>
                                    {propertyDetails?.amenities.map(
                                       (item: string, index: any) => (
                                          <OtherItem
                                             title={item}
                                             isAmenities={true}
                                          />
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
                                 <SimpleGrid
                                    w='full'
                                    minChildWidth='300px'
                                    spacingY={9}>
                                    {propertyDetails?.rules.map(
                                       (item: string, index: any) => (
                                          <OtherItem
                                             title={item}
                                             isAmenities={false}
                                          />
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
                                    {propertyDetails?.description}
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
                                    {propertyDetails?.address},{" "}
                                    {propertyDetails?.city}
                                 </Text>
                              </Box>
                           </VStack>
                        </GridItem>
                        <GridItem
                           px={5}
                           pt={6}
                           colSpan={1}
                           bg='brand.sky'
                           roundedTopStart='2xl'
                           roundedTopEnd='2xl'
                           shadow='md'
                           h={290}>
                           <MessageCompose
                              ownerId={propertyDetails!.owner_id}
                              propertyId={propertyDetails!._id}
                              propertyDetail={propertyDetails}
                           />
                        </GridItem>
                     </Grid>
                  </VStack>
               )}
            </Box>
         </SlideUp>
      </>
   );
};

export default ListingDetailsPage;
