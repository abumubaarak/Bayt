import { Box, Container, VStack } from "@chakra-ui/layout";
import React, { FC } from "react";
import BackgroundImage from "@assets/background.jpg";
import { HomePageProps } from "@type/base";
 
const Home: FC<HomePageProps> = ({ children, header }) => {
   return (
      <Box
         h='100vh'
         bgImage={`url(${BackgroundImage})`}
         bgPosition='center'
         bgSize='auto'
         bgRepeat='no-repeat'>
         {header}
         <Container pt={14} maxW='container.md'>
            <VStack justifyContent='center' spacing={7}>
               {children}
            </VStack>
         </Container>
      </Box>
   );
};
export default Home;
