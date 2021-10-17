import {
   Box,
   Divider,
   HStack,
   SimpleGrid,
   Tag,
   Text,
   VStack,
} from "@chakra-ui/react";
import Header from "@components/Header.component";
import Loading from "@components/Loading.component";
import { useListing } from "@hooks/useApi";
import SlideUp from "@transition/SlideUp.transition";
// Import Swiper styles
import { Params } from "@type/base";
import { useEffect, useState } from "react";
import { BiBath, BiBed, BiPolygon } from "react-icons/bi";
import { useHistory, useParams } from "react-router-dom";
import SwiperCore, { Autoplay, Pagination } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

SwiperCore.use([Pagination, Autoplay]);

export default function ListingPage() {
   const { slug }: Params = useParams();
   const history = useHistory();
   const [city, setCity] = useState<string>("");
   const { data: property, isError, error, isLoading } = useListing(city);
   const { REACT_APP_BASE_URL_2: IMAGE_URL } = process.env;

   useEffect(() => {
      setCity(slug);
   }, [slug]);

   return (
      <>
         <Header />
         <SlideUp setMarginBottom={true}>
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
                  {property &&
                     property.data.map(
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
                              key={slug}
                              cursor='pointer'
                              pb={2}
                              maxW={340}
                              onClick={() =>
                                 history.push({
                                    pathname: `/details/${slug}`,
                                    state: _id,
                                 })
                              }
                              shadow='md'
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
                                             bg='white'
                                             variant='subtle'
                                             m={3}
                                             fontWeight='semibold'>
                                             ${cost}
                                          </Tag>
                                       </Box>
                                    </SwiperSlide>
                                 ))}
                              </Swiper>

                              <VStack
                                 spacing='2'
                                 flex='1'
                                 p={2}
                                 alignItems='stretch'>
                                 <Text
                                    fontSize='md'
                                    color='brand.700'
                                    noOfLines={2}
                                    fontWeight='semibold'>
                                    {name}
                                 </Text>
                                 <Text
                                    className='font-sand'
                                    color='gray.600'
                                    fontWeight='medium'
                                    noOfLines={2}
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
               </SimpleGrid>
            </VStack>
         </SlideUp>
      </>
   );
}
