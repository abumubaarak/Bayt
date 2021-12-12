import { ResponseObj, UserInfo } from "@api/apiType";
import {
   Button,
   HStack,
   Input,
   Text,
   Textarea,
   VStack,
} from "@chakra-ui/react";
import { useUpdate } from "@hooks/useApi";
import useToastMessage from "@hooks/useToastMessage";
import { IUser } from "@type/base";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function EditProfileForm({
   user,
   edit,
   cancelProfileEdit,
}: {
   edit: boolean;
   cancelProfileEdit: (edit: boolean) => void | undefined;
   user: ResponseObj<UserInfo> | undefined;
}) {
   const { handleSubmit, register, reset } = useForm<IUser>();
   const makeVisble = edit ? "none" : "flex";
   const mutation = useUpdate();
   const { message } = useToastMessage();

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
         cancelProfileEdit(true);

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
      <VStack w='full' alignItems='flex-start' spacing='8'>
         <VStack w='full' alignItems='start'>
            <Text
               className='font-railway'
               fontSize='2xl'
               color='gray.700'
               fontWeight='bold'>
               Account Information
            </Text>
            <VStack shadow='md' p='3' rounded='md' spacing='4' w='full'>
               <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
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
                           defaultValue={user?.data.firstname}
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
                           defaultValue={user?.data.lastname}
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
                        defaultValue={user?.data.bio}
                        disabled={edit}
                        fontWeight='semibold'
                        {...register("bio")}
                        resize='none'
                        minH='150px'
                     />
                  </VStack>

                  <HStack display={makeVisble} w='full' mt='3'>
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
                        onClick={() => cancelProfileEdit(!edit)}
                        colorScheme='red'
                        variant='outline'>
                        Cancel
                     </Button>
                  </HStack>
               </form>
            </VStack>
         </VStack>
      </VStack>
   );
}
