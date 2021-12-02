import { Box, Container } from "@chakra-ui/layout";
import PaymentAlert from "@components/PaymentAlert.component";
import React from "react";
 
const PaymentSuccess = () => {
 
   return (
      <Box bg='gray.50' h='100vh'>
         <Container h='xs' pt='50px' maxW='96'>
            <PaymentAlert type="success"/>
         </Container>
      </Box>
   );
};
export default PaymentSuccess;
