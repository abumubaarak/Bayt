import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Header from "@components/Header.component";
import ListingCard from "@components/ListingCard.component";
import Loading from "@components/Loading.component";
import { useListing } from "@hooks/useApi";
import SlideUp from "@transition/SlideUp.transition";
// Import Swiper styles
import { Params } from "@type/base";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import "swiper/swiper-bundle.css";

SwiperCore.use([Pagination, Autoplay]);

export default function ListingPage() {
   const { slug }: Params = useParams();
   const [city, setCity] = useState<string>("");
   const { data: property, isError, error, isLoading } = useListing(city);

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
                  <ListingCard data={property?.data!} isTetant={true} />
               </SimpleGrid>
            </VStack>
         </SlideUp>
      </>
   );
}
