import { Box, VStack } from "@chakra-ui/react";
import Heading from "@components/Heading.component";
import React, { ReactNode } from "react";

const LandlordLayoutWrap = ({
   children,
   title,
   others,
   enable,
}: {
   children?: ReactNode;
   others?: ReactNode;
   title: string;
   enable?: boolean;
}) => {
   return (
      <Box maxW='8xl' px={5} w='full' rounded='md'>
         {enable && <Heading title={title} />}

         <VStack
            maxW='8xl'
            bg={`${enable && "white"}`}
            shadow={`${enable && "sm"}`}
            rounded='md'>
            {children}
         </VStack>
         {others}
      </Box>
   );
};

export default LandlordLayoutWrap;
