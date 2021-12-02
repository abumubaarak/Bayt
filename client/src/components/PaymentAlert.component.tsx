import {
   Alert,
   AlertDescription,
   AlertIcon,
   AlertTitle,
   Button,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
type PaymentAlertProps = {
   type: "success" | "error";
};
const PaymentAlert = ({ type }: PaymentAlertProps) => {
   const history = useHistory();

   const isSuccess = type === "success";

   return (
      <Alert
         status={type}
         rounded='md'
         variant='subtle'
         shadow='lg'
         bg='white'
         flexDirection='column'
         alignItems='center'
         justifyContent='center'
         textAlign='center'
         height='300px'>
         <AlertIcon boxSize='60px' mr={0} />
         <AlertTitle mt={4} mb={1} fontSize='lg'>
            {isSuccess ? "Payment Successful!" : "Payment Failed!"}
         </AlertTitle>
         <AlertDescription maxWidth='sm'>
            {isSuccess
               ? "Congratulation you have secured the property.Your payment has been sent to the landlord."
               : "Failed"}
         </AlertDescription>
         <Button
            variant='outline'
            mt={7}
            colorScheme={isSuccess ? "green" : "red"}
            onClick={() =>
               isSuccess
                  ? history.replace("payment")
                  : history.replace("")
            }>
            {isSuccess ? "VIEW PAYMENT" : "Cancel"}
         </Button>
      </Alert>
   );
};
export default PaymentAlert;
