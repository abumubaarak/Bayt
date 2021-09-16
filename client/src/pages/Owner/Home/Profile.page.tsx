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
  import ProfileImage from "../../../assets/profile.png";
  import React, { useState } from "react";
  import { FiEdit } from "react-icons/fi";
   import { useUpdate, useUser } from "../../../hooks/useApi";
  import { useMutation } from "react-query";
  import axios from "axios";
  import { SubmitHandler, useForm } from "react-hook-form";
  import { useEffect } from "react";
  import useToastMessage from "../../../hooks/useToastMessage";
  
  export interface IUser {
    firstname: string | undefined;
    lastname: string;
    bio: string;
  }
  
  export default function Profile() {
    const { data } = useUser();
    const [edit, setEdit] = useState<boolean>(true);
    const [user, setUser] = useState<IUser>(data?.data);

      
    const { message } = useToastMessage();
    const mutation = useUpdate();
    const { handleSubmit, register, reset } = useForm<IUser>();
  
    const editGroup = edit ? "none" : "flex";
  
    const handleEditProfile = () => {
      setEdit(false);
    };
  
    const handleCancel = () => {
      setEdit(true);
    };
    const onSubmit: SubmitHandler<IUser> = (data) => {
      mutation.mutate({ ...data });
    };
  
    useEffect(() => {
      reset({
        firstname: user?.firstname,
        lastname: user?.lastname,
        bio: user?.bio,
      });
    }, [reset]);
  
    useEffect(() => {
      if (mutation.isSuccess) {
        setEdit(true);
  
        message({
          status: "success",
          description: "Profile Updated Successful",
          position: "top-right",
        });
      }
    }, [mutation.isSuccess]);
  
    useEffect(() => {
      if (mutation.isError) {
        message({
          status: "error",
          description: "Unable to save profile info",
          position: "top-right",
        });
      }
    }, [mutation.isError]);
  
    return (
      <>
   
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
                  {data?.data?.firstname}
                </Text>
                <Text> {data?.data?.email}</Text>
                <Button
                  size="sm"
                  w="full"
                  className="font-sand"
                  leftIcon={<FiEdit />}
                  fontWeight="semibold"
                  color="white"
                  onClick={handleEditProfile}
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
                  <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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
                        <Input
                          className="font-railway"
                          variant="filled"
                          type="text"
                          disabled={edit}
                          {...register("firstname")}
                        />
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
                        <Input
                          variant="filled"
                          {...register("lastname")}
                          disabled={edit}
                        />
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
                      <Textarea
                        variant="filled"
                        disabled={edit}
                        {...register("bio")}
                        resize="none"
                        minH="150px"
                      />
                    </VStack>
  
                    <HStack display={editGroup} w="full" mt="3">
                      <Button
                        size="md"
                        type="submit"
                        w="full"
                        isLoading={mutation.isLoading}
                        colorScheme="brand"
                      >
                        Update
                      </Button>
                      <Button
                        size="md"
                        w="full"
                        onClick={handleCancel}
                        colorScheme="red"
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </HStack>
                  </form>
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
                  {` Your ${data?.data?.provider} Account is linked`}
                </Text>
              </VStack>
            </VStack>
          </GridItem>
        </Grid>
      </>
    );
  }
  