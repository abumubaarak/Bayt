import {
   Avatar,
   Box,
   Flex,
   HStack,
   Icon,
   Text,
   Tooltip,
   VStack,
} from "@chakra-ui/react";
import { usePaymentCheckout, useUserConversation } from "@hooks/useApi";
import "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { MessageDetails } from "@type/base";
import React, { useState } from "react";
import { BiBuildingHouse } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { useHistory } from "react-router";
import { io } from "socket.io-client";
import ChatBox from "./ChatBox.component";
import Conversation from "./Conversation.component";

interface Props {
   messageDetails: MessageDetails;
   type: "owner" | "tenant";
}

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY!);
const ConversationPanel = ({ type, messageDetails }: Props) => {
   const payment = usePaymentCheckout();
   const [online, setOnline] = useState<boolean>(false);

   const history = useHistory();
   const isTenant = type === "tenant";

   const { data: conversation } = useUserConversation(
      messageDetails.messageId!
   );

   console.log(messageDetails);

   const socket = io("http://localhost:9000");
   socket.on("connect", () => {
      socket.emit(
         "user",
         window.localStorage.getItem("id") + messageDetails.messageId!
      );
   });
   socket.on("typing", (data) => {
      console.log(data);
      if (data.isTyping) {
         setOnline(true);
      } else {
         setOnline(false);
      }
   });
   const handlePayment = async (propertyId: string) => {
      const stripe = await stripePromise;

      payment.mutate({ propertyId });

      const result = stripe?.redirectToCheckout({
         sessionId: payment.data?.data.id!,
      });
   };

   return (
      <VStack flex='1' bg='gray.100' h='full'>
         {messageDetails.messageId && (
            <>
               <Flex
                  rounded='sm'
                  alignItems='center'
                  bg='white'
                  h='16'
                  pl={8}
                  justifyContent='space-between'
                  w='full'>
                  <Avatar
                     backgroundColor='brand.500'
                     color='white'
                     size='md'
                     name={`${messageDetails.fullname!}`}
                     alignSelf='center'
                  />

                  <Text fontWeight='semibold' fontFamily='heading'>
                     {messageDetails.fullname}
                  </Text>
                  {type === "tenant" ? (
                     <HStack pr={8} spacing={7}>
                        <Tooltip label='View Property'>
                           <span>
                              <Icon
                                 cursor='pointer'
                                 as={BiBuildingHouse}
                                 w={7}
                                 h={7}
                                 onClick={() =>
                                    history.push({
                                       pathname: `/details/${messageDetails.propertyId}`,
                                       state: messageDetails.propertyId,
                                    })
                                 }
                              />
                           </span>
                        </Tooltip>
                        <Tooltip label='Make Payment'>
                           <span>
                              <Icon
                                 cursor='pointer'
                                 as={MdPayment}
                                 w={7}
                                 h={7}
                                 onClick={() =>
                                    handlePayment(messageDetails.propertyId!)
                                 }
                              />
                           </span>
                        </Tooltip>
                     </HStack>
                  ) : (
                     <>
                        <Box></Box>
                     </>
                  )}
               </Flex>

               <VStack
                  pt={5}
                  w='full'
                  scroll
                  flex='1'
                  id='el'
                  alignItems='start'
                  overflowY='scroll'
                  spacing='4'
                  pr='5'>
                  <Conversation
                     socket={socket}
                     conversation={conversation?.data!}
                     owner_id={messageDetails.ownerId}
                  />

                  <Box w='full'></Box>
               </VStack>

               <Flex
                  shadow='md'
                  rounded='sm'
                  alignItems='center'
                  bg='white'
                  h='55px'
                  w='full'>
                  {isTenant ? (
                     <ChatBox
                        socket={socket}
                        messageId={messageDetails.messageId}
                        tenant_id={messageDetails.tenantId}
                        owner_id={messageDetails.ownerId}
                     />
                  ) : (
                     <ChatBox
                        socket={socket}
                        messageId={messageDetails.messageId}
                        tenant_id={messageDetails.tenantId._id}
                        owner_id={messageDetails.ownerId}
                     />
                  )}
               </Flex>
            </>
         )}
      </VStack>
   );
};
export default ConversationPanel;
