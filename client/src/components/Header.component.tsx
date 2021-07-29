import React, { useState } from "react";
import AuthModel from "./AuthModal.component";
import CircularButton from "./Button.component";
import Logo from "./Logo.component";
import { useDisclosure } from "@chakra-ui/hooks";

import Nav from "./Nav.component";
import NavItem from "./NavItem.component";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [type, setType] = useState<boolean>();

  const handleModal = (authtype: boolean): void => {
    onOpen();
    setType(authtype);
  };

  return (
    <div className="flex justify-between  px-20 pt-7">
      <Logo />
      <Nav>
        <NavItem>How it works</NavItem>
        <NavItem handleModal={() => handleModal(false)}>Login</NavItem>
        <CircularButton handleModal={() => handleModal(true)}>Register</CircularButton>
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
