import { Grid, GridItem } from "@chakra-ui/react";
import EditProfileForm from "@components/EditProfileForm.component";
import ProfileCard from "@components/ProfileCard.component";
import LandlordLayoutWrap from "@layouts/landlordLayoutWrap.layout";
import React, { useEffect, useState } from "react";
import { useUpdate, useUser } from "../../hooks/useApi";
import useToastMessage from "../../hooks/useToastMessage";

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

   const editGroup = edit ? "none" : "flex";

   const handleEditProfile = (edit: boolean) => {
      setEdit(edit);
   };

  

   return (
      <LandlordLayoutWrap title='Profile' enable={true}>
         <Grid
            w='full'
            h='70vh'
            mt={10}
            px={7}
            mx='auto'
            templateColumns='repeat(5,1fr)'
            gap={20}>
            <GridItem colSpan={1}>
               <ProfileCard
                  user={user}
                  type='Landlord'
                  edit={edit}
                  setEditProfile={handleEditProfile}
               />
            </GridItem>

            <GridItem colSpan={4}>
               <EditProfileForm
                  user={user}
                  cancelProfileEdit={handleEditProfile}
                  edit={edit}
               />
            </GridItem>
         </Grid>
      </LandlordLayoutWrap>
   );
}
