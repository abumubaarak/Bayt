import {
  Avatar,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  VStack,
  Modal,
  ModalHeader,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { HStack } from "@chakra-ui/layout";
import React, { FC } from "react";
import { useOwner, useUser } from "../hooks/useApi";

interface Props {
  id: string;
}
const UserProfile: FC<Props> = ({ id }) => {
  const user = useOwner(id);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUserOnclick = () => {
    onOpen();
  };

  return (
    <>
      <HStack>
        <Avatar />
        <Text
          className="font-sand"
          fontSize="lg"
          onClick={handleUserOnclick}
          cursor="pointer"
          colorScheme="brand.400"
          fontWeight="semibold"
        >
          {user.data?.data.firstname}
        </Text>
      </HStack>

      <Modal onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="full" alignItems="start">
              <HStack w="full">
                <Avatar />
                <Text
                  className="font-sand"
                  fontSize="xl"
                  cursor="pointer"
                  colorScheme="brand.400"
                  fontWeight="bold"
                >
                  {user.data?.data.firstname + " " + user.data?.data.lastname}
                </Text>
              </HStack>
              <Text
                className="font-railway"
                fontSize="md"
                pt={3}
                colorScheme="brand.400"
                fontWeight="bold"
              >
                BIO
              </Text>
              <Text className="font-sand" fontSize="md" fontWeight="semibold">
                {user.data?.data?.bio}
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserProfile;
