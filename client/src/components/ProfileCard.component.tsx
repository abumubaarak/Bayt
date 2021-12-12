import { ResponseObj, UserInfo } from "@api/apiType";
import ProfileImage from "@assets/profile.png";
import { Button, HStack, Image, Tag, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FiEdit } from "react-icons/fi";

const setEditProfile = () => {};

export default function ProfileCard({
   type,
   setEditProfile,
   edit,
   user,
}: {
   type: "Tenant" | "Landlord";
   setEditProfile: (edit: boolean) => void;
   edit: boolean;
   user: ResponseObj<UserInfo> | undefined;
}) {
   const userType = type === "Landlord";

   return (
      <VStack shadow='md' rounded='md' mx='auto'>
         <Image src={ProfileImage} boxSize='sm' h='56' objectFit='cover' />
         <VStack w='full' px='5' py='3'>
            <HStack>
               <Text fontSize='xl' fontWeight='semibold' className='font-sand'>
                  {user?.data.firstname}
               </Text>
               <Tag
                  size='sm'
                  variant='solid'
                  colorScheme={userType ? "orange" : "pink"}>
                  {type}
               </Tag>
            </HStack>
            <Text> {user?.data.email}</Text>
            <Button
               size='sm'
               w='full'
               className='font-sand'
               leftIcon={<FiEdit />}
               fontWeight='semibold'
               color='white'
               onClick={() => setEditProfile!(!edit)}
               ml='10'
               bg='brand.500'>
               Edit Profile
            </Button>{" "}
         </VStack>
      </VStack>
   );
}
