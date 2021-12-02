import {
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerHeader,
   DrawerOverlay,
   Image,
   Tag,
   Text,
   VStack,
} from "@chakra-ui/react";
import {
   useLandlord,
   useListingDetails,
   useSinglePayment,
} from "@hooks/useApi";
import { formatCurrency } from "@utils/utils";
import React from "react";

type Props = {
   propertyId: string;
   paymentId: string;
   isOpen: any;
   onClose: any;
};
const PaymentDrawer = ({ propertyId, isOpen, onClose, paymentId }: Props) => {
   const { data: paymentDetails } = useSinglePayment(paymentId);
   const { data: propertyDetails } = useListingDetails(propertyId);
   const { data: landlord } = useLandlord(propertyDetails?.data.owner_id);
   const { REACT_APP_BASE_URL_2: IMAGE_URL } = process.env;

   return (
      <div>
         <Drawer size='sm' isOpen={isOpen} placement='right' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton />
               <DrawerHeader>Payment Details</DrawerHeader>
               <DrawerBody>
                  <Image
                     src={`${IMAGE_URL}${propertyDetails?.data.images[0]}`}
                     rounded='md'
                     height='250px'
                     shadow='md'
                     w='full'
                     objectFit='cover'
                     bgColor='red.400'
                  />

                  <VStack spacing='3'>
                     <VStack
                        alignItems='start'
                        justifyContent='start'
                        w='full'
                        spacing='1'
                        mt='20px'>
                        <Text fontWeight='semibold'>ID</Text>
                        <Text fontWeight='medium' wordBreak='break-all'>
                           {`${paymentDetails?.data.checkoutID}`}
                        </Text>
                     </VStack>
                     <VStack alignItems='start' mt='20px'>
                        <Text fontWeight='semibold'>Description</Text>
                        <Text fontWeight='medium'>
                           {`Payment for ${propertyDetails?.data.name} at ${propertyDetails?.data.address}`}
                        </Text>
                     </VStack>
                     <VStack
                        alignItems='start'
                        justifyContent='start'
                        w='full'
                        mt='20px'>
                        <Text fontWeight='semibold'>Total Amount</Text>
                        <Text fontWeight='medium'>
                           {formatCurrency(String(propertyDetails?.data.cost))}
                        </Text>
                     </VStack>
                     <VStack
                        alignItems='start'
                        justifyContent='start'
                        w='full'
                        spacing='1'
                        mt='20px'>
                        <Text fontWeight='semibold'>Status</Text>
                        <Tag
                           size='md'
                           variant='solid'
                           colorScheme={
                              paymentDetails?.data.status === "paid"
                                 ? "green"
                                 : "red"
                           }>
                           {paymentDetails?.data.status}
                        </Tag>
                     </VStack>

                     <VStack
                        alignItems='start'
                        justifyContent='start'
                        w='full'
                        mt='20px'>
                        <Text fontWeight='semibold'>PAID TO</Text>
                        <Text fontWeight='medium'>
                           {`${landlord?.data.firstname}`}{" "}
                           <Tag size='md' variant='solid' colorScheme='green'>
                              Landlord
                           </Tag>
                        </Text>
                     </VStack>
                     <VStack
                        alignItems='start'
                        justifyContent='start'
                        w='full'
                        mt='20px'>
                        <Text fontWeight='semibold'>PAID ON:</Text>
                        <Text fontWeight='medium'>
                           {`${paymentDetails?.data.paidOn}`}
                        </Text>
                     </VStack>
                  </VStack>
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </div>
   );
};

export default PaymentDrawer;
