import { Box, Container, Heading } from "@chakra-ui/react";
import Header from "@components/Header.component";
import React, { ReactNode } from "react";

const TenantLayoutWrap = ({
   children,
   title,
}: {
   children: ReactNode;
   title: string;
}) => {
   return (
      <Box w='full' h='100vh'>
         <Header variant='others' />

         <Container maxW='container.xl' rounded='md' mt={5} px={0} h='xl'>
            <Heading as='h3' size='xl'>
               {title}
            </Heading>
            {children}
         </Container>
      </Box>
   );
};

export default TenantLayoutWrap;
