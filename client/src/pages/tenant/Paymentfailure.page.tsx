import { Box, Container } from "@chakra-ui/layout";
import PaymentAlert from "@components/PaymentAlert.component";
import React from "react";

const PaymentFailure = () => {
   return (
      <Box bg='gray.50' h='100vh'>
         <Container h='xs' pt='50px' maxW='96'>
            <PaymentAlert type='error' />
         </Container>
      </Box>
   );
};
export default PaymentFailure;
