import {
  Box,
  Center,
  Divider,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { IoClose, IoCheckmark } from "react-icons/io5";
import { Avatar, IconButton, Icon, useDisclosure } from "@chakra-ui/react";
import {
  useAceptTenentRequest,
  useDeclineTenentRequest,
  useOwnerV2,
  useTenent,
} from "../../../hooks/useApi";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import useToastMessage from "../../../hooks/useToastMessage";
import { useHistory } from "react-router";
import UserProfile from "../../../components/UserProfile.component";

export default function Tenants() {
  const tenent = useTenent();
  const declineTenentRequest = useDeclineTenentRequest();
  const acceptTenentRequest = useAceptTenentRequest();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState();
  const user = useOwnerV2();
  const history = useHistory();
  const toast = useToastMessage();

  const handleUserOnclick = (userId: any) => {
    onOpen();
  };

  useEffect(() => {
    if (declineTenentRequest.isSuccess) {
      toast.successToast("Tenent request declined successfully");
    }
  }, [declineTenentRequest.isSuccess]);
  useEffect(() => {
    if (acceptTenentRequest.isSuccess) {
      history.push("message");
    }
  }, [acceptTenentRequest.isSuccess]);

  useEffect(() => {
    if (declineTenentRequest.isError) {
      toast.errorToast("Unable decline tenent request");
    }
  }, [declineTenentRequest.isError]);

  useEffect(() => {
    if (acceptTenentRequest.isError) {
      toast.errorToast("Unable accept tenent request");
    }
  }, [acceptTenentRequest.isError]);

  useEffect(() => {
    tenent.data?.data.map((item: any, index: any) => {
      user.mutate(item.tenent_id);
    });
  }, []);
  return (
    <Box maxW="full" shadow="md" bg="white" rounded="md">
      <HStack bg="gray.50" px={9} py={4}>
        <Text
          className="font-railway"
          fontSize="2xl"
          color="gray.700"
          fontWeight="bold"
        >
          Pending Request
        </Text>
        <Spacer />
        <Text
          className="font-sand"
          fontSize="lg"
          colorScheme="brand.400"
          fontWeight="bold"
        >
          {`${tenent.data?.data.length} new applicants`}
        </Text>
      </HStack>
      <Divider />
      {tenent && tenent.data?.data.length > 0 ? (
        tenent.data?.data.map((item: any, index: any) => (
          <>
            <HStack key={index} px={9} py={4}>
              <UserProfile id={item.tenent_id} />
              <Spacer />
              <Text
                className="font-sand"
                fontSize="lg"
                noOfLines={1}
                isTruncated={true}
                colorScheme="brand.400"
                fontWeight="semibold"
              >
                {item.request}
              </Text>
              <Spacer />
              <HStack spacing={3}>
                <IconButton
                  colorScheme="whiteAlpha"
                  shadow="lg"
                  rounded="full"
                  isLoading={declineTenentRequest.isLoading}
                  onClick={() => declineTenentRequest.mutate(item._id)}
                  aria-label="Cancel"
                  icon={<Icon as={IoClose} w={7} h={7} color="red" />}
                />
                <IconButton
                  colorScheme="white"
                  aria-label="Accept"
                  onClick={() => acceptTenentRequest.mutate(item._id)}
                  shadow="lg"
                  isLoading={acceptTenentRequest.isLoading}
                  rounded="full"
                  icon={<Icon as={IoCheckmark} w={7} h={7} color="green" />}
                />
              </HStack>
            </HStack>
            <Divider />
          </>
        ))
      ) : (
        <>
          <Center>
            <Text
              className="font-sand"
              fontSize="xl"
              cursor="pointer"
              p={5}
              colorScheme="brand.400"
              fontWeight="bold"
            >
              No Pending Request
            </Text>
          </Center>
        </>
      )}

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
    </Box>
  );
}
