import React, { useState } from "react";
import AuthModel from "./AuthModal.component";
import CircularButton from "./Button.component";
import Logo from "./Logo.component";
import { useDisclosure } from "@chakra-ui/hooks";

import Nav from "./Nav.component";
import NavItem from "./NavItem.component";
import LogoText from "./LogoText.component";
import { Avatar, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { logout, useUser } from "../hooks/useApi";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [type, setType] = useState<boolean>();

  const { data } = useUser();

  const handleModal = (authtype: boolean): void => {
    onOpen();
    setType(authtype);
  };

  return (
    <div className="flex justify-between  px-20 pt-7">
      <LogoText />
      <Nav>
        <NavItem>How it works</NavItem>
        {data ? (
          <>
            <Avatar />
          </>
        ) : (
          <>
            <NavItem handleModal={() => handleModal(false)}>Login</NavItem>
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
    </div>
  );
};

export default Header;
