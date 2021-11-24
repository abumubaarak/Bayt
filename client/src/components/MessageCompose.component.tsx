import { VStack } from "@chakra-ui/layout";
import { Button, Textarea } from "@chakra-ui/react";
import { useTenantMessage, useUser } from "@hooks/useApi";
import useToastMessage from "@hooks/useToastMessage";
import { TenantMessageComposeProps } from "@type/base";
import React, { FC, useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { UseMutationResult } from "react-query";
import UserInfo from "./UserInfo.component";

const sendTenantMessage = (
   message: any,
   tenent: UseMutationResult<any, unknown, any, unknown>,
   ownerId: string,
   propertyId: string,
   userId: string,
   toast: any
) => {
   if (userId) {
      if (message!.length > 10) {
         tenent.mutate({
            request: message,
            owner_id: ownerId,
            property_id: propertyId,
         });
      }
   } else {
      toast.error("You need to login.");
   }
};

const handleChange = (
   e: any,
   setMessage: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
   setMessage(e.target.value);
};

const MessageCompose: FC<TenantMessageComposeProps> = ({
   propertyId,
   ownerId,
   propertyDetail,
}) => {
   const tenentMessage = useTenantMessage();
   const [message, setMessage] = useState<string>();

   const toast = useToastMessage();
   const { data: user } = useUser();

   const isMessageSent = user?.data.request.some(
      (value: string) => value === propertyId
   );

   useEffect(() => {
      setMessage(
         `I am interested in ${propertyDetail?.name} , ${propertyDetail?.address}.`
      );
   }, []);

   useEffect(() => {
      if (tenentMessage.isSuccess) {
         toast.success("Message successfully sent to Owner");
      }
   }, [tenentMessage.isSuccess]);

   useEffect(() => {
      if (tenentMessage.isError) {
         toast.error("Unable to send Owner message");
      }
   }, [tenentMessage.isError]);
   return (
      <VStack spacing='4'>
         <UserInfo id={ownerId} />
         <Textarea
            variant='outline'
            spellCheck='false'
            w='full'
            className='font-sand'
            color='white'
            fontWeight='semibold'
            lineHeight='6'
            minH='127px'
            py={2}
            disabled={isMessageSent}
            name='message'
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
               handleChange(e, setMessage)
            }
            resize='none'
            value={message}
         />

         <Button
            size='md'
            className='font-sand'
            leftIcon={<FiSend />}
            w='full'
            onClick={() =>
               sendTenantMessage(message, tenentMessage, ownerId, propertyId,user?.data._id!,toast)
            }
            fontWeight='semibold'
            color='gray.900'
            disabled={isMessageSent}
            isLoading={tenentMessage.isLoading}
            bg='white'>
            Request to chat
         </Button>
      </VStack>
   );
};

export default MessageCompose;
