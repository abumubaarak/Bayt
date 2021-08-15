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
} from "@chakra-ui/react";
import React from "react";
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

interface ISearch {
  city: string;
}
const HeaderMain = () => {
  const { register, handleSubmit } = useForm<ISearch>();
  const [searchValue, setSearchValue] = useState<string>();
  const { isLoading, data } = useQuery([searchValue], () =>
    searchListing(searchValue)
  );
  const history = useHistory();

  const onSubmit = (data: ISearch) => {
    const { city }: ISearch = data;
    history.push(`/s/${city}`);
    setSearchValue(city);
  };
  return (
    <>
      <HStack pt={2} px={5} justifyContent="space-between" w="full" h="90px">
        <Logo />
        <HStack rounded="2xl" shadow="sm" w="320px">
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
        </HStack>
        <Nav>
          <NavItem variant={true}>Login</NavItem>
          <CircularButton>Register</CircularButton>
        </Nav>
      </HStack>
      <Divider />
    </>
  );
};
export default HeaderMain;
