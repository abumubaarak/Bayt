import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import ProfileImage from "../../assets/profile.png";
import React from "react";
import { FiEdit } from "react-icons/fi";
import HeaderMain from "../../components/HeaderMain.component";

export default function ProfilePage() {
  return (
    <>
      <HeaderMain variant="others" />

      <Grid
        w="full"
        maxW="6xl"
        h="screen"
        mt={10}
        mx="auto"
        templateColumns="repeat(5,1fr)"
        gap={4}
      >
        <GridItem colSpan={2}>
          <VStack shadow="md" maxW="80" rounded="md" mx="auto">
            <Image src={ProfileImage} boxSize="sm" h="56" objectFit="cover" />
            <VStack w="full" px="5" py="3">
              <Text fontSize="2xl" fontWeight="semibold" className="font-sand">
                Abu Sa'ad
              </Text>
              <Text>ismaildev070@gmail.com</Text>
              <Button
                size="sm"
                w="full"
                className="font-sand"
                leftIcon={<FiEdit />}
                fontWeight="semibold"
                color="white"
                ml="10"
                bg="brand.500"
              >
                Edit Profile
              </Button>{" "}
            </VStack>
          </VStack>
        </GridItem>

        <GridItem colSpan={3}>
          <VStack alignItems="flex-start" spacing="8">
            <VStack w="full" alignItems="start">
              <Text
                className="font-railway"
                fontSize="2xl"
                color="gray.700"
                fontWeight="bold"
              >
                Account Information
              </Text>
              <VStack shadow="md" p="3" rounded="md" spacing="4" w="full">
                <HStack w="full">
                  <VStack w="full" alignItems="start">
                    <Text
                      className="font-railway"
                      fontSize="xl"
                      color="gray.700"
                      fontWeight="medium"
                    >
                      Firstname
                    </Text>
                    <Input variant="filled" />
                  </VStack>
                  <VStack w="full" alignItems="start">
                    <Text
                      className="font-railway"
                      fontSize="xl"
                      color="gray.700"
                      fontWeight="medium"
                    >
                      Lastname
                    </Text>
                    <Input variant="filled" />
                  </VStack>
                </HStack>
                <VStack w="full" alignItems="start">
                  <Text
                    className="font-railway"
                    fontSize="xl"
                    color="gray.700"
                    fontWeight="medium"
                  >
                    Bio
                  </Text>
                  <Textarea variant="filled" resize="none" minH="150px" />
                </VStack>
              </VStack>
            </VStack>

            <VStack w="full" alignItems="start">
              <Text
                className="font-railway"
                fontSize="2xl"
                color="gray.700"
                fontWeight="bold"
              >
                Linked Account
              </Text>

              <Text
                className="font-railway"
                fontSize="xl"
                color="gray.700"
                fontWeight="medium"
                shadow="md"
                p="3"
                rounded="md"
                w="full"
              >
                Your Google Account is linked
              </Text>
            </VStack>
          </VStack>
        </GridItem>
      </Grid>
    </>
  );
}
