import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spacer,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  BiBath,
  BiBed,
  BiPhoneIncoming,
  BiPolygon,
  BiRectangle,
} from "react-icons/bi";
import { BsHouse, BsImageAlt } from "react-icons/bs";
import image from "../../../assets/background.jpg";
import CircularButton from "../../../components/Button.component";
import Logo from "../../../components/Logo.component";
import Nav from "../../../components/Nav.component";
import NavItem from "../../../components/NavItem.component";
import { Property, useFetch } from "../../../hooks/useFetch";

export default function ListingPage() {
  const { data } = useFetch("Dubai");
  console.log(data?.data.length);

  return (
    <VStack w="100%" spacing={10}>
      <HStack w="full" px="8" py="3" shadow="sm">
        <Logo variant={true} />
        <Flex
          alignItems="center"
          w="80"
          ml="2"
          rounded="sm"
          className="shadow-md border-2 h-12"
        >
          <form>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BsHouse color="gray.300" className="w-5 h-5" />}
              />

              <Input
                border="none"
                focusBorderColor="none"
                type="search"
                placeholder="Search City"
              />
            </InputGroup>
          </form>
        </Flex>
        <Spacer />
        <Nav>
          <NavItem variant={true}>Login</NavItem>
          <CircularButton>Register</CircularButton>
        </Nav>
      </HStack>
      {/* repeat(auto-fit, minmax(300px, 329px)) */}
      <Flex maxW="8xl" w="full">
        <SimpleGrid
          sx={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 329px)) ",
          }}
          w="full"
          spacing="10"
        >
          {data &&
            data.data?.map((item, index) => (
              <VStack
                cursor="pointer"
                pb={2}
                maxW={340}
                shadow="md"
                rounded="md"
              >
                <Box
                  bgImage={`url(${image})`}
                  roundedTop="md"
                  w="full"
                  h="220px"
                  bgSize="cover"
                  bgPos="center"
                  bgRepeat="no-repeat"
                >
                  <Tag
                    size="md"
                    colorScheme="red"
                    variant="subtle"
                    m={3}
                    fontWeight="semibold"
                  >
                    ${item.cost}
                  </Tag>
                </Box>

                <VStack spacing="2" flex="1" p={2} alignItems="stretch">
                  <Text
                    className="font-railway"
                    fontSize="md"
                    noOfLines={2}
                    fontWeight="semibold"
                  >
                    {item.name}
                  </Text>
                  <Text
                    className="font-sand"
                    color="gray.600"
                    fontWeight="medium"
                    noOfLines={2}
                    fontSize="sm"
                  >
                    {item.address}
                  </Text>
                  <Divider />
                  <HStack className="font-sand" color="gray.500" spacing="5">
                    <HStack spacing="0.5">
                      <BiBed className="w-5 h-7" />
                      <Text>{item.avaliableBedroom}Bed</Text>
                    </HStack>
                    <HStack spacing="0.5">
                      <BiBath className="w-5 h-7" />
                      <Text>{item.avaliableBathroom} Bathroom</Text>
                    </HStack>
                    <HStack spacing="0.5">
                      <BiPolygon className="w-5 h-7" />
                      <Text fontWeight="medium" pl="1">
                        {item.propertySize}Sq<Text as="sup">ft</Text>
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>
              </VStack>
            ))}
        </SimpleGrid>
      </Flex>
    </VStack>
  );
}
