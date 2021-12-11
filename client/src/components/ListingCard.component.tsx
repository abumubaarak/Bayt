import { ListingInfo } from "@api/apiType";
import { Box, Divider, HStack, Tag, Text, VStack } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { BiBath, BiBed, BiPolygon } from "react-icons/bi";
import { useHistory } from "react-router";
import SwiperCore, { Autoplay, Pagination } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import ListingDetails from "./ListingDetails.component";

SwiperCore.use([Pagination, Autoplay]);

interface ListingCardProps {
   data: ListingInfo[];
   isTetant: boolean;
}

const ListingCard: FC<ListingCardProps> = ({ data, isTetant }) => {
   const { REACT_APP_BASE_URL_2: IMAGE_URL } = process.env;
   const history = useHistory();
   const [listingId, setId] = useState<string>();

   const handleClick = (historyId: string, slug: string, isTetant: boolean) => {
      isTetant
         ? history.push({
              pathname: `/details/${slug}`,
              state: historyId,
           })
         : setId(Math.floor(Math.random() * 10) + historyId);
   };
   return (
      <>
         {data &&
            data.map(
               ({
                  slug,
                  name,
                  _id,
                  images,
                  cost,
                  address,
                  avaliableBathroom,
                  avaliableBedroom,
                  propertySize,
               }) => (
                  <VStack
                     key={_id}
                     cursor='pointer'
                     pb={2}
                     maxW={320}
                     onClick={() => handleClick(_id, slug, isTetant)}
                     shadow='md'
                     bgColor='white'
                     rounded='md'>
                     <Swiper
                        effect='fade'
                        className='w-full'
                        slidesPerView={1}
                        autoplay={true}
                        pagination={{ clickable: true }}>
                        {images.map((image: string) => (
                           <SwiperSlide>
                              <Box
                                 key={image}
                                 bgImage={`url(${IMAGE_URL}${image})`}
                                 roundedTop='md'
                                 w='full'
                                 h='220px'
                                 bgSize='cover'
                                 bgPos='center'
                                 bgRepeat='no-repeat'>
                                 <Tag
                                    size='md'
                                    bg='orange'
                                    variant='subtle'
                                    m={3}
                                    px={3}
                                    fontSize='md'
                                    rounded='2xl'
                                    color='white'
                                    fontWeight='bold'>
                                    ${cost}
                                 </Tag>
                              </Box>
                           </SwiperSlide>
                        ))}
                     </Swiper>

                     <VStack spacing='2' flex='1' p={2} alignItems='stretch'>
                        <Text
                           fontSize='md'
                           color='brand.700'
                           noOfLines={1}
                           fontWeight='semibold'>
                           {name}
                        </Text>
                        <Text
                           className='font-sand'
                           color='gray.600'
                           fontWeight='medium'
                           noOfLines={1}
                           fontSize='sm'>
                           {address}
                        </Text>
                        <Divider />
                        <HStack
                           className='font-sand'
                           color='gray.500'
                           spacing='5'>
                           <HStack spacing='0.5'>
                              <BiBed className='w-5 h-7' />
                              <Text>{avaliableBedroom}Bed</Text>
                           </HStack>
                           <HStack spacing='0.5'>
                              <BiBath className='w-5 h-7' />
                              <Text>{avaliableBathroom} Bathroom</Text>
                           </HStack>
                           <HStack spacing='0.5'>
                              <BiPolygon className='w-5 h-7' />
                              <Text fontWeight='medium' pl='1'>
                                 {propertySize}Sq
                                 <Text as='sup'>ft</Text>
                              </Text>
                           </HStack>
                        </HStack>
                     </VStack>
                  </VStack>
               )
            )}
         {listingId && <ListingDetails id={listingId!} />}
      </>
   );
};

export default ListingCard;
