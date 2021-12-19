import BackgroundImage from "@assets/background.jpg";
import { Box, Container, VStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { HomePageProps } from "@type/base";
import React, { FC } from "react";

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
         <a
            href='https://dribbble.com/shots/14259769-Town-House/attachments/5908270?mode=media'
            target='_blank'
         >
             <Text shadow="md" fontWeight="semibold" p={5} color='white' pos='fixed' bottom='0' right='0'>
            copyright
         </Text>
         </a>
        
      </Box>
   );
};
export default Home;
