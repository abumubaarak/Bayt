import { ResponseArr, TenantMessage } from "@api/apiType";
import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import PropertyName from "./Propertyname.component";
import Username from "./Username.component";

interface Props {
   getMessageDetails: (id: string, tenantID: string, ownerId: string,propertyId:string) => void;
   type: "owner" | "tenant";
   messageList?: ResponseArr<TenantMessage>;
}
const MessageListPanel: FC<Props> = ({
   getMessageDetails,
   type,
   messageList,
}) => {
   const [activeId, setActiveId] = useState<string>("");
   const handleClick = (
      _id: string,
      tenantID: string,
      ownerId: string,
      propertyId: string
   ) => {
      setActiveId(_id);
      getMessageDetails(_id, tenantID, ownerId,propertyId);
   };

   return (
      <div>
         <VStack overflowY='scroll' alignItems='start' w='sm' h='full'>
            {messageList?.data.map(
               ({ _id, message, tenant_id, owner_id, property_id }) => (
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
                        onClick={() => handleClick(_id!, tenant_id, owner_id,property_id)}>
                        <Avatar size='md' alignSelf='center' />
                        <VStack spacing='0' alignItems='start'>
                           <Username
                              userId={type === "tenant" ? owner_id : tenant_id}
                           />
                           <PropertyName propertyId={property_id} />

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
