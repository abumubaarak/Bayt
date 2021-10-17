import {
   Button,
   Grid,
   GridItem,
   HStack,
   Image,
   Input,
   Text,
   Textarea,
   VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import ProfileImage from "../../assets/profile.png";
import Header from "../../components/Header.component";
import { useUpdate, useUser } from "../../hooks/useApi";
import useToastMessage from "../../hooks/useToastMessage";

export interface IUser {
   firstname: string | undefined;
   lastname: string;
   bio: string;
}

const handleEditProfile = (
   setEdit: React.Dispatch<React.SetStateAction<boolean>>
) => {
   setEdit(false);
};

const handleCancel = (
   setEdit: React.Dispatch<React.SetStateAction<boolean>>
) => {
   setEdit(true);
};

export default function ProfilePage() {
   const { data: user } = useUser();
   const [edit, setEdit] = useState<boolean>(true);

   const { message } = useToastMessage();
   const mutation = useUpdate();
   const { handleSubmit, register, reset } = useForm<IUser>();

   const editGroup = edit ? "none" : "flex";

   const onSubmit: SubmitHandler<IUser> = (data) => {
      mutation.mutate({ ...data });
   };
   useEffect(() => {
      reset({
         firstname: user?.data.firstname,
         lastname: user?.data.lastname,
         bio: user?.data.bio,
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
         <Header variant='others' />

         <Grid
            w='full'
            maxW='6xl'
            h='screen'
            mt={10}
            mx='auto'
            templateColumns='repeat(5,1fr)'
            gap={4}>
            <GridItem colSpan={2}>
               <VStack shadow='md' maxW='80' rounded='md' mx='auto'>
                  <Image
                     src={ProfileImage}
                     boxSize='sm'
                     h='56'
                     objectFit='cover'
                  />
                  <VStack w='full' px='5' py='3'>
                     <Text
                        fontSize='2xl'
                        fontWeight='semibold'
                        className='font-sand'>
                        {user?.data.firstname}
                     </Text>
                     <Text> {user?.data.email}</Text>
                     <Button
                        size='sm'
                        w='full'
                        className='font-sand'
                        leftIcon={<FiEdit />}
                        fontWeight='semibold'
                        color='white'
                        onClick={() => handleEditProfile(setEdit)}
                        ml='10'
                        bg='brand.500'>
                        Edit Profile
                     </Button>{" "}
                  </VStack>
               </VStack>
            </GridItem>

            <GridItem colSpan={3}>
               <VStack alignItems='flex-start' spacing='8'>
                  <VStack w='full' alignItems='start'>
                     <Text
                        className='font-railway'
                        fontSize='2xl'
                        color='gray.700'
                        fontWeight='bold'>
                        Account Information
                     </Text>
                     <VStack
                        shadow='md'
                        p='3'
                        rounded='md'
                        spacing='4'
                        w='full'>
                        <form
                           className='w-full'
                           onSubmit={handleSubmit(onSubmit)}>
                           <HStack w='full'>
                              <VStack w='full' alignItems='start'>
                                 <Text
                                    className='font-railway'
                                    fontSize='xl'
                                    color='gray.700'
                                    fontWeight='medium'>
                                    Firstname
                                 </Text>
                                 <Input
                                    className='font-railway'
                                    variant='filled'
                                    type='text'
                                    fontWeight='semibold'
                                    disabled={edit}
                                    {...register("firstname")}
                                 />
                              </VStack>
                              <VStack w='full' alignItems='start'>
                                 <Text
                                    className='font-railway'
                                    fontSize='xl'
                                    color='gray.700'
                                    fontWeight='medium'>
                                    Lastname
                                 </Text>
                                 <Input
                                    variant='filled'
                                    fontWeight='semibold'
                                    {...register("lastname")}
                                    disabled={edit}
                                 />
                              </VStack>
                           </HStack>
                           <VStack w='full' alignItems='start'>
                              <Text
                                 className='font-railway'
                                 fontSize='xl'
                                 color='gray.700'
                                 fontWeight='medium'>
                                 Bio
                              </Text>
                              <Textarea
                                 variant='filled'
                                 disabled={edit}
                                 fontWeight='semibold'
                                 {...register("bio")}
                                 resize='none'
                                 minH='150px'
                              />
                           </VStack>

                           <HStack display={editGroup} w='full' mt='3'>
                              <Button
                                 size='md'
                                 type='submit'
                                 w='full'
                                 isLoading={mutation.isLoading}
                                 colorScheme='brand'>
                                 Update
                              </Button>
                              <Button
                                 size='md'
                                 w='full'
                                 onClick={() => handleCancel(setEdit)}
                                 colorScheme='red'
                                 variant='outline'>
                                 Cancel
                              </Button>
                           </HStack>
                        </form>
                     </VStack>
                  </VStack>

                  <VStack w='full' alignItems='start'>
                     <Text
                        className='font-railway'
                        fontSize='2xl'
                        color='gray.700'
                        fontWeight='bold'>
                        Linked Account
                     </Text>

                     <Text
                        className='font-railway'
                        fontSize='xl'
                        color='gray.700'
                        fontWeight='medium'
                        shadow='md'
                        p='3'
                        rounded='md'
                        w='full'>
                        {` Your ${user?.data.provider} Account is linked`}
                     </Text>
                  </VStack>
               </VStack>
            </GridItem>
         </Grid>
      </>
   );
}
