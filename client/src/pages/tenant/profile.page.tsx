import {
   Button,
   Grid,
   GridItem,
   HStack,
   Input,
   Text,
   Textarea,
   VStack,
} from "@chakra-ui/react";
import EditProfileForm from "@components/EditProfileForm.component";
import ProfileCard from "@components/ProfileCard.component";
import TenantLayoutWrap from "@layouts/tenantLayoutwrap.layout";
import { IUser } from "@type/base";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdate, useUser } from "../../hooks/useApi";
import useToastMessage from "../../hooks/useToastMessage";

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
   const handleEditProfile = (edit: boolean) => {
      setEdit(edit);
   };
   return (
      <TenantLayoutWrap title='Profile'>
         <Grid
            w='full'
            h='screen'
            mt={10}
            mx='auto'
            templateColumns='repeat(5,1fr)'
            gap={20}>
            <GridItem colSpan={1}>
               <ProfileCard
                  user={user}
                  edit={edit}
                  type='Tenant'
                  setEditProfile={handleEditProfile}
               />
            </GridItem>

            <GridItem colSpan={4}>
               <VStack alignItems='flex-start' spacing='8'>
                  <EditProfileForm
                     user={user}
                     cancelProfileEdit={handleEditProfile}
                     edit={edit}
                  />

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
      </TenantLayoutWrap>
   );
}
