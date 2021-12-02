import { Box, VStack } from "@chakra-ui/react";
import Heading from "@components/Heading.component";
import React, { ReactNode } from "react";

const LandlordLayoutWrap = ({
   children,
    title,
   others
}: {
        children?: ReactNode;
    others?:ReactNode
   title: string;
}) => {
   return (
      <Box maxW='8xl' px={5} w='full' rounded='md'>
         <Heading title={title} />
         <VStack maxW='8xl' bg='white' shadow='sm' rounded='md' mt={5} py={4}>
            {children}
           </VStack>
           {others}
      </Box>
   );
};

export default LandlordLayoutWrap;
