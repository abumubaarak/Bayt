import { VStack } from "@chakra-ui/layout";
import React, { FC, ReactNode } from "react";
interface Props {
   children: ReactNode;
}

const Slidenav: FC<Props> = ({ children }) => {
   return (
      <VStack spacing={10} w='full' as='ul' color='gray.400'>
         {children}
      </VStack>
   );
};

export default Slidenav;
