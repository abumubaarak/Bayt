import { HStack, Spacer } from "@chakra-ui/layout";
import { Box, Button, Grid, Text } from "@chakra-ui/react";
import Heading from "@components/Heading.component";
import ListingCard from "@components/ListingCard.component";
import Loading from "@components/Loading.component";
import { useOwnerListing } from "@hooks/useApi";
import React from "react";
import { BsArrowBarRight } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import "swiper/swiper-bundle.css";

SwiperCore.use([Pagination, Autoplay]);

export default function Listings() {
   const history = useHistory();
   const { data: property, isError, error, isLoading } = useOwnerListing();

   return (
      <Box w='full'>
         <HStack>
            <Heading title='Listings' />
            <Spacer />
            <Button
               colorScheme='brand'
               variant='outline'
               rightIcon={<BsArrowBarRight />}
               onClick={() => history.push("list/new")}>
               Add new
            </Button>
         </HStack>
         {isError && <Text>{error?.message}</Text>}

         {isLoading && <Loading />}
         <Grid templateColumns='repeat(4,1fr)' mt='10' rowGap={8} columnGap={2}>
            <ListingCard data={property?.data!} isTetant={false} />
         </Grid>
      </Box>
   );
}
