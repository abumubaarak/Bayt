import {
   Avatar,
   Box,
   Flex,
   HStack,
   Icon,
   IconButton,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   Text,
   VStack,
} from "@chakra-ui/react";
import { useUserConversation } from "@hooks/useApi";
import React, { FC, useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { BiChat } from "react-icons/bi";
import { io } from "socket.io-client";
import ChatBox from "./ChatBox.component";
import Conversation from "./Conversation.component";
import Username from "./Username.component";

interface Props {
   messageID: string;
   tenant_id: string;
   owner_id: string;
   type: "owner" | "tenant";
}
const ConversationPanel: FC<Props> = ({
   messageID,
   tenant_id,
   type,
   owner_id,
}) => {
   const [online, setOnline] = useState<boolean>(false);
   let messagesEnd: any;

   const { data: conversation } = useUserConversation(messageID);

   const socket = io("http://localhost:9000");
   socket.on("connect", () => {
      socket.emit("user", localStorage.getItem("id") + messageID);
   });
   socket.on("typing", (data) => {
      console.log(data);
      if (data.isTyping) {
         setOnline(true);
      } else {
         setOnline(false);
      }
   });
   // useEffect(() => {
   //    // socket.on("receive_chat", (data) => {
   //    //    messagesEnd.scrollIntoView({ behavior: "smooth" });
   //    //    // if (messageRef.current) {
   //    //    // messageRef.scrollIntoView({
   //    //    //    behavior: "smooth",
   //    //    // });
   //    //    // }
   //    // });
   // }, []);

   return (
      <VStack flex='1' bg='gray.100' h='full'>
         {!messageID && (
            <VStack
               rounded='sm'
               bg='gray.100'
               h='full'
               pb={16}
               spacing={6}
               justifyContent='center'
               w='full'>
               <VStack
                  boxSize='52'
                  justifyContent='center'
                  bgColor='white'
                  shadow='sm'
                  rounded='full'>
                  <Icon as={BiChat} w='16' h='16' />
               </VStack>

               <Text fontWeight='semibold' fontSize='2xl'>
                  Tap a user to start chatting!.
               </Text>
            </VStack>
         )}

         {messageID && (
            <>
               <Flex
                  rounded='sm'
                  alignItems='center'
                  bg='white'
                  h='16'
                  w='full'>
                  <HStack
                     w='full'
                     cursor='pointer'
                     alignItems='start'
                     pl='40px'>
                     <Avatar size='sm' alignSelf='center' />
                     <VStack pl={2} spacing='0' alignItems='start'>
                        <Username
                           userId={type === "tenant" ? owner_id : tenant_id}
                        />
                        <Text color='brand.600' fontWeight='semibold'>
                           {online ? "Typing..." : ""}
                        </Text>
                     </VStack>
                  </HStack>
                  <Menu>
                     <MenuButton
                        as={IconButton}
                        mx={5}
                        aria-label='Options'
                        variant='outline'
                        icon={<AiOutlineMore />}>
                        s
                     </MenuButton>
                     <MenuList>
                        <MenuItem >View Property</MenuItem>{" "}
                        <MenuItem>Make payment</MenuItem>
                     </MenuList>
                  </Menu>
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
                  pr='10'>
                  <Conversation
                     socket={socket}
                     conversation={conversation?.data!}
                     owner_id={owner_id}
                  />

                  <Box w='full'></Box>

                  <div
                     style={{ float: "left", clear: "both" }}
                     ref={(el) => {
                        messagesEnd = el;
                     }}></div>
               </VStack>

               <Flex
                  shadow='sm'
                  rounded='sm'
                  alignItems='center'
                  bg='white'
                  h='55px'
                  w='full'>
                  <ChatBox
                     socket={socket}
                     messageId={messageID}
                     tenant_id={tenant_id}
                     owner_id={owner_id}
                  />
               </Flex>
            </>
         )}
      </VStack>
   );
};
export default ConversationPanel;
