import { Flex, HStack } from "@chakra-ui/layout";
import React, { FC, ReactNode } from "react";

interface Props {
   slidebar?: any;
   children?: ReactNode;
}
const Layout: FC<Props> = ({ slidebar, children }) => {
   return (
      <HStack h='100vh' spacing={0}>
         <Flex h='100vh' as='nav' bg='white' maxW={20} w='full'>
            {slidebar}
         </Flex>

         <Flex
            h='100vh'
            overflowY='scroll'
            as='main'
            bg='gray.100'
            flex={1}
            p={6}>
            {children}
         </Flex>
      </HStack>
   );
};
export default Layout;
