import { UserInfo } from "@api/apiType";
import { HStack } from "@chakra-ui/layout";
import {
   Avatar,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
   useDisclosure,
   VStack,
} from "@chakra-ui/react";
import React from "react";

const handleModal = (onOpen: () => void) => {
   onOpen();
};

const UserAvatar = ({
   user: { firstname, lastname, bio },
}: {
   user: UserInfo;
}) => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const firstName = firstname;
   const fullName = firstName + " " + lastname;
   return (
      <>
         <HStack>
            <Avatar
               size='md'
               backgroundColor='brand.500'
               color='white'
               name={fullName}
            />
            <VStack alignItems='start' spacing={1}>
               <Text
                  fontSize='lg'
                  onClick={() => handleModal(onOpen)}
                  cursor='pointer'
                  color='black'
                  colorScheme='brand.400'
                  fontWeight='semibold'>
                  {fullName}
               </Text>

               <Text
                  mt='-1'
                  fontSize='sm'
                  color='brand.500'
                  fontWeight='semibold'>
                  Tenant
               </Text>
            </VStack>
         </HStack>

         <Modal onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>User Details</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <VStack w='full' alignItems='start'>
                     <HStack w='full'>
                        <Avatar />
                        <Text
                           className='font-sand'
                           fontSize='xl'
                           cursor='pointer'
                           colorScheme='brand.400'
                           fontWeight='bold'>
                           {fullName}
                        </Text>
                     </HStack>
                     <Text
                        className='font-railway'
                        fontSize='md'
                        pt={3}
                        colorScheme='brand.400'
                        fontWeight='bold'>
                        BIO
                     </Text>
                     <Text
                        className='font-sand'
                        fontSize='md'
                        fontWeight='semibold'>
                        {bio}
                     </Text>
                  </VStack>
               </ModalBody>
               <ModalFooter></ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

export default UserAvatar;
