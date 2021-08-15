import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spacer,
  Tag,
  TagLabel,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BiBath, BiBed, BiPolygon } from "react-icons/bi";
import { BsHouse } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { GiLoveHowl } from "react-icons/gi";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import CircularButton from "../../../components/Button.component";
import HeaderMain from "../../../components/HeaderMain.component";
import Logo from "../../../components/Logo.component";
import Nav from "../../../components/Nav.component";
import NavItem from "../../../components/NavItem.component";
import OtherItem from "../../../components/OtherItem.component";
import { getListing } from "../../../hooks/useFetch";
import SlideUp from "../../../transition/SlideUp.transition";

type Params = {
  slug: string;
};
const DetailsPage = () => {
  const { slug }: Params = useParams();
  const { state } = useLocation();
  const { data, isLoading } = useQuery([slug], () => getListing(state));
  return (
    <SlideUp setMarginBottom={true}>
      <HeaderMain />
      <Box mx="auto" mt={5} maxW="5xl" w="full">
        {data && (
          <VStack spacing="7" w="full" alignItems="start">
            <SimpleGrid
              columns={3}
              templateRows="repeat(2,225px)"
              h={450}
              spacing={2}
            >
              <GridItem rowSpan={2} colSpan={2}>
                <Box
                  bgImage={`url(http://localhost:7000/${data.data.images[2]})`}
                  roundedTopLeft="2xl"
                  roundedBottomLeft="2xl"
                  h="full"
                  bgSize="cover"
                  bgPos="center"
                  bgRepeat="no-repeat"
                >
                  <Tag
                    size="md"
                    borderRadius="full"
                    shadow="md"
                    bg="white"
                    m={3}
                    fontWeight="semibold"
                  >
                    <TagLabel>{data.data.propertyType}</TagLabel>
                  </Tag>
                </Box>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                {/* <Image
                  src={`http://localhost:7000/${data.data.images[1]}`}
                  boxSize="full"
                  roundedTopRight="2xl"
                  shadow="md"
                  fit="cover"
                /> */}
                <Flex
                  bgImage={`url(http://localhost:7000/${data.data.images[1]})`}
                  roundedTopRight="2xl"
                  justifyContent="flex-end"
                  boxSize="full"
                  bgSize="cover"
                  bgPos="center"
                  bgRepeat="no-repeat"
                >
                  <Button
                    size="md"
                    borderRadius="full"
                    shadow="md"
                    bg="white"
                    h={5}
                    m={3}
                    fontWeight="semibold"
                    leftIcon={<GiLoveHowl />}
                  >
                    Save
                  </Button>
                </Flex>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Image
                  src={`http://localhost:7000/${data.data.images[0]}`}
                  boxSize="full"
                  roundedBottomRight="2xl"
                  shadow="md"
                  fit="cover"
                />
              </GridItem>
            </SimpleGrid>

            <Grid w="full" gap="2" templateColumns="repeat(3,1fr)">
              <GridItem colSpan={2}>
                <VStack spacing={7} w="full" alignItems="start">
                  <VStack spacing="2" alignItems="start">
                    <Text
                      className="font-railway"
                      fontSize="2xl"
                      color="gray.700"
                      fontWeight="semibold"
                    >
                      {data.data.name}
                    </Text>
                    <Text
                      className="font-sand"
                      fontSize="lg"
                      color="gray.700"
                      fontWeight="bold"
                    >
                      ${data.data.cost}/year
                    </Text>

                    <HStack className="font-sand" color="gray.800" spacing="6">
                      <HStack spacing="1">
                        <BiBed className="w-5 h-7" />
                        <Text>{data.data.avaliableBedroom} Bedroom</Text>
                      </HStack>
                      <HStack spacing="1">
                        <BiBath className="w-5 h-7" />
                        <Text>{data.data.avaliableBathroom} Bathroom</Text>
                      </HStack>
                      <HStack spacing="0.5">
                        <BiPolygon className="w-5 h-7" />
                        <Text fontWeight="medium" pl="1">
                          {data.data.propertySize}Sq<Text as="sup">ft</Text>
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>

                  <VStack spacing="5" w="full" alignItems="start">
                    <Text
                      className="font-railway"
                      fontSize="2xl"
                      color="gray.700"
                      fontWeight="semibold"
                    >
                      Amenities
                    </Text>
                    <SimpleGrid w="full" minChildWidth="300px" spacingY={9}>
                      {data.data.amenities.map((item: string, index: any) => (
                        <OtherItem title={item} isAmenities={true} />
                      ))}
                    </SimpleGrid>
                  </VStack>

                  <VStack spacing="5" w="full" alignItems="start">
                    <Text
                      className="font-railway"
                      fontSize="2xl"
                      color="gray.700"
                      fontWeight="semibold"
                    >
                      Rules
                    </Text>
                    <SimpleGrid w="full" minChildWidth="300px" spacingY={9}>
                      {data.data.rules.map((item: string, index: any) => (
                        <OtherItem title={item} isAmenities={false} />
                      ))}
                    </SimpleGrid>
                  </VStack>
                  <Box>
                    <Text
                      className="font-railway"
                      fontSize="2xl"
                      color="gray.700"
                      fontWeight="semibold"
                    >
                      Description
                    </Text>
                    <Text>{data.data.description}</Text>
                  </Box>
                  <Box>
                    <Text
                      className="font-railway"
                      fontSize="2xl"
                      color="gray.700"
                      fontWeight="semibold"
                    >
                      Location
                    </Text>
                    <Text>
                      {data.data.address}, {data.data.city}
                    </Text>
                  </Box>
                </VStack>
              </GridItem>
              <GridItem
                px={5}
                pt={6}
                colSpan={1}
                bg="brand.sky"
                roundedTopStart="2xl"
                roundedTopEnd="2xl"
                shadow="md"
                h={290}
              >
                <VStack spacing="4">
                  <HStack w="full" alignItems="center">
                    <Avatar />
                    <Box>
                      <Text
                        fontSize="md"
                        color="white"
                        fontWeight="semibold"
                        className="font-sand"
                      >
                        Abu Sa'ad
                      </Text>
                      <Text
                        mt="-1"
                        fontSize="sm"
                        color="gray.400"
                        fontWeight="normal"
                      >
                        Owner
                      </Text>
                    </Box>
                  </HStack>

                  <Textarea
                    variant="outline"
                    spellCheck="false"
                    w="full"
                    className="font-sand"
                    color="white"
                    fontWeight="semibold"
                    lineHeight="6"
                    minH="127px"
                    py={2}
                    resize="none"
                    value={`I am interested in ${data.data.name} , ${data.data.address}.`}
                  />

                  <Button
                    size="md"
                    className="font-sand"
                    leftIcon={<FiSend />}
                    w="full"
                    fontWeight="semibold"
                    color="gray.900"
                    bg="white"
                  >
                    Send Message
                  </Button>
                </VStack>
              </GridItem>
            </Grid>
          </VStack>
        )}
      </Box>
    </SlideUp>
  );
};

export default DetailsPage;
