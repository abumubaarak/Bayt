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
import { UserInfoProps } from "@type/base";
import React, { FC } from "react";
import { useLandlord } from "../hooks/useApi";

const handleModal = (onOpen: () => void) => {
   onOpen();
};

const UserInfo: FC<UserInfoProps> = ({ id, variant = "light" }) => {
   const { data: user } = useLandlord(id);
   const { isOpen, onOpen, onClose } = useDisclosure();
   const variantMode = variant === "light";
   const colorMode = variantMode ? "white" : "black";
   const fontMode = variantMode ? "md" : "lg";
   const firstName = user?.data.firstname;
   const fullName = firstName + " " + user?.data.lastname;

   return (
      <>
         <HStack w={variantMode ? "full" : ""}>
            <Avatar />
            <VStack alignItems='start' spacing={1}>
               <Text
                  fontSize={fontMode}
                  onClick={() => handleModal(onOpen)}
                  cursor='pointer'
                  color={colorMode}
                  colorScheme='brand.400'
                  fontWeight='semibold'>
                  {variantMode ? firstName : fullName}
               </Text>

               <Text
                  mt='-1'
                  fontSize='sm'
                  color={variantMode ? "gray.400" : "brand.500"}
                  fontWeight='semibold'>
                  {variantMode ? "Owner" : "Tenant"}
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
                        {user?.data.bio}
                     </Text>
                  </VStack>
               </ModalBody>
               <ModalFooter></ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

export default UserInfo;
