import {
   Table,
   Tag,
   Tbody,
   Td,
   Th,
   Thead,
   Tr,
   useDisclosure,
} from "@chakra-ui/react";
import { useUserPayments } from "@hooks/useApi";
import { formatCurrency } from "@utils/utils";
import React, { useState } from "react";
import Loading from "./Loading.component";
import PaymentDescription from "./PaymentDescription.component";
import PaymentDrawer from "./PaymentDrawer.component";

const PaymentTable = ({ type }: { type: "tenant" | "landlord" }) => {
   const { data: payment, isLoading } = useUserPayments();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [paymentInfo, setPaymentInfo] = useState<any>({});

   const handleClick = (propertyId: string, paymentId: string) => {
      setPaymentInfo({
         propertyId,
         paymentId,
      });
      onOpen();
   };

   return (
      <>
         {isLoading && <Loading />}

         <Table
            variant='simple'
            mt={`${type === "tenant" && "22px"}`}
            size='lg'>
            <Thead>
               <Tr>
                  <Th>Amount</Th>
                  <Th>Description</Th>
                  <Th>Staus</Th>
                  <Th>Date</Th>
               </Tr>
            </Thead>
            <Tbody>
               {payment?.data.map(
                  ({ amount, paidOn, status, propertyID, _id }) => (
                     <Tr
                        onClick={() => handleClick(propertyID, _id)}
                        cursor='pointer'>
                        <Td fontWeight='semibold' color='gray.600'>
                           {formatCurrency(amount)}
                        </Td>
                        <PaymentDescription propertyId={propertyID} />
                        <Td>
                           <Tag
                              size='md'
                              variant='solid'
                              colorScheme={status === "paid" ? "green" : "red"}>
                              {status}
                           </Tag>
                        </Td>

                        <Td>{paidOn}</Td>
                     </Tr>
                  )
               )}
            </Tbody>
         </Table>
         {paymentInfo && (
            <PaymentDrawer
               propertyId={paymentInfo.propertyId}
               isOpen={isOpen}
               onClose={onClose}
               paymentId={paymentInfo.paymentId}
            />
         )}
      </>
   );
};
export default PaymentTable;
