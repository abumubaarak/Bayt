import {
  Flex,
  Text,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Divider,
  IconButton,
  InputRightAddon,
  InputRightElement,
  useDisclosure,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { searchListing } from "../hooks/useFetch";
import CircularButton from "./Button.component";
import Logo from "./Logo.component";
import Nav from "./Nav.component";
import NavItem from "./NavItem.component";

import { Avatar } from "@chakra-ui/react";
import { logout, useUser } from "../hooks/useFetch";
import AuthModel from "./AuthModal.component";
import { CgProfile } from "react-icons/cg";

interface ISearch {
  city: string;
}

interface Props {
  variant?: "home" | "others";
}

const HeaderMain: FC<Props> = ({ variant }) => {
  const isDark = variant === "home" ? "light" : "dark";
  const { register, handleSubmit } = useForm<ISearch>();
  const [searchValue, setSearchValue] = useState<string>();
  // const { data } = useQuery([searchValue], () => searchListing(searchValue));
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [type, setType] = useState<boolean>();

  const { data } = useUser();

  const onSubmit = (data: ISearch) => {
    const { city }: ISearch = data;
    history.push(`/s/${city}`);
    setSearchValue(city);
  };

  const handleModal = (authtype: boolean): void => {
    onOpen();
    setType(authtype);
  };

  return (
    <>
      <HStack px={10} justifyContent="space-between" w="full" py={5} pt={8}>
        <Logo variant={isDark} />
        <HStack rounded="2xl" shadow="sm" w="320px">
          {variant !== "home" && (
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <InputGroup>
                <Input
                  placeholder="Search City"
                  variant="filled"
                  border="none"
                  rounded="2xl"
                  className="font-sand"
                  size="md"
                  {...register("city")}
                />
                <InputRightElement
                  children={
                    <IconButton
                      colorScheme="brand"
                      rounded="3xl"
                      aria-label="Search city"
                      icon={<BiSearch />}
                    />
                  }
                />
              </InputGroup>
            </form>
          )}
        </HStack>
        <Nav>
          <NavItem variant={isDark}>How it works</NavItem>
          {data ? (
            <>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<CgProfile />}
                  rounded="full"
                ></MenuButton>
                <MenuList>
                  <MenuItem>Message</MenuItem>
                  <MenuItem onClick={()=>history.push("/profile")}>Profile</MenuItem>
                  <MenuItem>Wishlisit</MenuItem>
                  <MenuItem>Notification</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <NavItem variant={isDark} handleModal={() => handleModal(false)}>
                Login
              </NavItem>
              <CircularButton handleModal={() => handleModal(true)}>
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
export default HeaderMain;
