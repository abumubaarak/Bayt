import { ResponseArr, TenantMessage } from "@api/apiType";
import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import { MessageDetails } from "@type/base";
import React, { useState } from "react";
import TimeAgo from "react-timeago";
import Loading from "./Loading.component";

type Props = {
   messageDetails: (messageDetails: MessageDetails) => void;
   type: "owner" | "tenant";
   isLoading: boolean;
   messageList?: ResponseArr<TenantMessage>;
};
const MessageListPanel = ({
   messageDetails,
   type,
   isLoading,
   messageList,
}: Props) => {
   const [activeId, setActiveId] = useState<string>("");
   const handleClick = (message: MessageDetails) => {
       setActiveId(message?.messageId!);
      messageDetails({ ...message });
   };

   const isTenant = type === "tenant";

   return (
      <div>
         <VStack alignItems='start' w='sm' h='full'>
            <HStack h='16' alignItems='center' px='5' shadow='sm' w='full'>
               <Text fontWeight='semibold' fontFamily='body' fontSize='md'>
                  My Messages
               </Text>
            </HStack>

            {isLoading && <Loading />}
            {messageList?.data.map(
               ({ _id, message, tenant_id, owner_id, property_id, sentAt }) => (
                  <>
                     <HStack
                        w='full'
                        key={_id}
                        bg={`${activeId === _id ? "gray.50" : ""}`}
                        cursor='pointer'
                        alignItems='start'
                        py={2}
                        px={4}
                        pr={2}
                        onClick={() =>
                           handleClick({
                              messageId: _id!,
                              fullname: isTenant
                                 ? owner_id.firstname + " " + owner_id.lastname
                                 : tenant_id.firstname +
                                   " " +
                                   tenant_id.lastname,
                              ownerId:
                                 type === "owner" ? owner_id : owner_id._id,
                              propertyId: property_id._id,
                              tenantId: tenant_id,
                           })
                        }>
                        <Avatar
                           size='md'
                           backgroundColor='brand.500'
                           color='white'
                           name={`${
                              isTenant
                                 ? owner_id.firstname + " " + owner_id.lastname
                                 : tenant_id.firstname +
                                   " " +
                                   tenant_id.lastname
                           }`}
                           alignSelf='center'
                        />
                        <VStack spacing='0' alignItems='start'>
                           <HStack w='full' justifyContent='space-between'>
                              <Text fontWeight='medium'>
                                 {isTenant
                                    ? owner_id.firstname
                                    : tenant_id.firstname}
                              </Text>
                              <Text fontWeight='normal' color='gray.400'>
                                 <TimeAgo className='line' date={sentAt!} />
                              </Text>
                           </HStack>
                           <Text
                              color='gray.800'
                              fontWeight='black'
                              fontSize='md'
                              noOfLines={1}>
                              {property_id?.name}
                           </Text>
                           <Text
                              color='gray.800'
                              fontWeight='medium'
                              noOfLines={1}>
                              {message}
                           </Text>
                        </VStack>
                     </HStack>
                  </>
               )
            )}
         </VStack>
      </div>
   );
};
export default MessageListPanel;
