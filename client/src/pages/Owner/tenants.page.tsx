/* eslint-disable react-hooks/exhaustive-deps */
import {
   Box,
   Center,
   Divider,
   HStack,
   Spacer,
   Text,
   VStack,
} from "@chakra-ui/layout";
import {
   Icon,
   IconButton,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Tooltip,
   useDisclosure,
} from "@chakra-ui/react";
import Heading from "@components/Heading.component";
import UserInfo from "@components/UserInfo.component";
import {
   useAceptTenentRequest,
   useDeclineTenentRequest,
   useTenent,
} from "@hooks/useApi";
import useToastMessage from "@hooks/useToastMessage";
import { useEffect, useState } from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { useHistory } from "react-router";

const handleModal = (
   onOpen: () => void,
   setRequest: (request: string) => any,
   request: string
) => {
   onOpen();
   setRequest(request);
};
export default function Tenants() {
   const { data: tenant } = useTenent();
   const declineTenentRequest = useDeclineTenentRequest();
   const acceptTenentRequest = useAceptTenentRequest();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const history = useHistory();
   const toast = useToastMessage();
   const [request, setRequest] = useState("");

   useEffect(() => {
      if (declineTenentRequest.isSuccess) {
         toast.success("Tenent request declined successfully");
      }
   }, [declineTenentRequest.isSuccess]);
   useEffect(() => {
      if (acceptTenentRequest.isSuccess) {
         history.push("message");
      }
   }, [acceptTenentRequest.isSuccess]);

   useEffect(() => {
      if (declineTenentRequest.isError) {
         toast.error("Unable decline tenent request");
      }
   }, [declineTenentRequest.isError]);

   useEffect(() => {
      if (acceptTenentRequest.isError) {
         toast.error("Unable accept tenent request");
      }
   }, [acceptTenentRequest.isError]);

   return (
      <Box maxW='8xl' px={5} w='full' rounded='md'>
         <Heading title='Tenant' />
         <VStack bg='white' shadow='sm' rounded='md' mt={5} py={4}>
            <HStack w='full' px={9} py={1}>
               <Text fontSize='lg' fontWeight='semibold'>
                  Pending Request
               </Text>
               <Spacer />
               <Text
                  className='font-sand'
                  fontSize='lg'
                  colorScheme='brand.400'
                  fontWeight='bold'>
                  {`${tenant?.data.length} new applicants`}
               </Text>
            </HStack>
            <Divider />
            {tenant?.data.length === 0 && (
               <Center>
                  <Text
                     className='font-sand'
                     fontSize='xl'
                     cursor='pointer'
                     p={5}
                     colorScheme='brand.400'
                     fontWeight='bold'>
                     No Pending Request
                  </Text>
               </Center>
            )}
            {tenant?.data.map(({ _id, owner_id, tenant_id, request }) => (
               <>
                  <HStack w='full' spacing={5} py={3} px={9}>
                     <UserInfo variant='dark' id={tenant_id} />
                     <Text
                        className='font-sand'
                        fontSize='lg'
                        flex={1}
                        textAlign='center'
                        isTruncated={true}
                        px={2}
                        cursor='pointer'
                        onClick={() =>
                           handleModal(onOpen, setRequest, request!)
                        }
                        colorScheme='brand.400'
                        fontWeight='semibold'>
                        {request}
                     </Text>
                     <HStack spacing={3}>
                        <Tooltip label='Decline Request'>
                           <IconButton
                              colorScheme='whiteAlpha'
                              shadow='lg'
                              rounded='full'
                              isLoading={declineTenentRequest.isLoading}
                              onClick={() => declineTenentRequest.mutate(_id!)}
                              aria-label='Cancel'
                              icon={
                                 <Icon as={IoClose} w={7} h={7} color='red' />
                              }
                           />
                        </Tooltip>
                        <Tooltip label='Accept Request'>
                           <IconButton
                              colorScheme='white'
                              aria-label='Accept'
                              onClick={() => acceptTenentRequest.mutate(_id!)}
                              shadow='lg'
                              isLoading={acceptTenentRequest.isLoading}
                              rounded='full'
                              icon={
                                 <Icon
                                    as={IoCheckmark}
                                    w={7}
                                    h={7}
                                    color='green'
                                 />
                              }
                           />
                        </Tooltip>
                     </HStack>
                  </HStack>
               </>
            ))}
         </VStack>
         <Modal onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>
                  <Text fontSize='2xl' color='brand.500' fontWeight='semibold'>
                     Request
                  </Text>
               </ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <VStack w='full' alignItems='start'>
                     <Text
                        className='font-sand'
                        fontSize='md'
                        fontWeight='semibold'>
                        {request}
                     </Text>
                  </VStack>
               </ModalBody>
               <ModalFooter></ModalFooter>
            </ModalContent>
         </Modal>
      </Box>
   );
}
