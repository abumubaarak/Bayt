import { HStack, Spacer } from "@chakra-ui/layout";
import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { BsArrowBarRight } from "react-icons/bs";
import { useHistory } from "react-router-dom";

export default function Listings() {
   const history = useHistory();

   return (
      <Box w='full'>
         <HStack>
            <Text fontSize='2xl' color='brand.500' fontWeight='semibold' px={5}>
               Listings
            </Text>{" "}
            <Spacer />
            <Button
               colorScheme='brand'
               variant='outline'
               rightIcon={<BsArrowBarRight />}
               onClick={() => history.push("list/new")}>
               Add new
            </Button>
         </HStack>
      </Box>
   );
}
