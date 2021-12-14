import { logout } from "@api/api";
import {
   Divider,
   HStack,
   Icon,
   IconButton,
   Input,
   InputGroup,
   InputRightElement,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   useDisclosure,
} from "@chakra-ui/react";
import { useUser } from "@hooks/useApi";
import useSubmit from "@hooks/useSubmit";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useHistory } from "react-router-dom";
import { HeaderProps, ISearch } from "../Types/base";
import AuthModel from "./AuthModal.component";
import CircularButton from "./Button.component";
import Logo from "./Logo.component";
import Nav from "./Nav.component";
import NavItem from "./NavItem.component";

const handleModal = (
   authtype: boolean,
   onOpen: () => void,
   setType: React.Dispatch<React.SetStateAction<boolean | undefined>>
): void => {
   onOpen();
   setType(authtype);
};

const Header: FC<HeaderProps> = ({ variant }) => {
   const isDark = variant === "home" ? "light" : "dark";
   const { register, handleSubmit } = useForm<ISearch>();
   const history = useHistory();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [type, setType] = useState<boolean>();
   const { onSubmit } = useSubmit();
   const { data } = useUser();
   localStorage.setItem("id", data?.data._id!);

    const handleLogout = () => {
      logout();
      localStorage.clear();
      window.location.reload();
   };
   return (
      <>
         <HStack
            px={[1, 7, 10]}
            justifyContent='space-between'
            w='full'
            h='80px'
            pt={variant !== "home" ? 0 : 5}>
            <Logo variant={isDark} />
            <HStack rounded='2xl' shadow='sm' w='320px'>
               {variant !== "home" && (
                  <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                     <InputGroup>
                        <Input
                           placeholder='Search City'
                           variant='filled'
                           border='none'
                           rounded='2xl'
                           className='font-sand'
                           size='md'
                           _focus={{
                              shadow: "sm",
                              fontWeight: "semibold",
                           }}
                           {...register("city")}
                        />
                        <InputRightElement w='50px' p={3}>
                           <IconButton
                              colorScheme='brand'
                              rounded='full'
                              aria-label='Search city'
                              icon={<Icon as={BiSearch} w={6} h={7} />}
                           />
                        </InputRightElement>
                     </InputGroup>
                  </form>
               )}
            </HStack>
            <Nav>
               {localStorage.getItem("id") !== "undefined" ? (
                  <>
                     <Menu>
                        <MenuButton
                           as={IconButton}
                           icon={<CgProfile />}
                           rounded='full'></MenuButton>
                        <MenuList>
                           <MenuItem onClick={() => history.push("/profile")}>
                              My Profile
                           </MenuItem>
                           <MenuItem onClick={() => history.push("/message")}>
                              Message
                           </MenuItem>
                           <MenuItem onClick={() => history.push("/wishlists")}>
                              Wishlist
                           </MenuItem>
                           <MenuItem onClick={() => history.push("/payment")}>
                              Payments
                           </MenuItem>
                           <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                     </Menu>
                  </>
               ) : (
                  <>
                     <NavItem variant={isDark}>How it works</NavItem>
                     <NavItem
                        variant={isDark}
                        handleModal={() => handleModal(false, onOpen, setType)}>
                        Login
                     </NavItem>

                     <CircularButton
                        handleModal={() => handleModal(true, onOpen, setType)}>
                        Register
                     </CircularButton>
                  </>
               )}
            </Nav>
            <AuthModel
               isOpen={isOpen}
               typeAuth={type!}
               setType={setType}
               onClose={onClose}
            />
         </HStack>

         {variant !== "home" && <Divider />}
      </>
   );
};
export default Header;
