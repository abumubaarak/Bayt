import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

export default function Loading() {
   return (
      <Center maxW='8xl' w='full'>
         <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='brad.500'
            size='xl'
         />
      </Center>
   );
}
