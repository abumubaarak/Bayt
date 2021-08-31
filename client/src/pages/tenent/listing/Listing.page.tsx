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
  Spinner,
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
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
// Import Swiper styles

import { BsHouse, BsImageAlt } from "react-icons/bs";
import CircularButton from "../../../components/Button.component";
import Logo from "../../../components/Logo.component";
import Nav from "../../../components/Nav.component";
import NavItem from "../../../components/NavItem.component";
import { Property, searchListing } from "../../../hooks/useFetch";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { GiCityCar } from "react-icons/gi";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import SlideUp from "../../../transition/SlideUp.transition";
import HeaderMain from "../../../components/HeaderMain.component";
import { Params } from "../../../Types/TypeUtils";

SwiperCore.use([Pagination, Autoplay]);

export default function ListingPage() {
  const { slug }: Params = useParams();
  const history = useHistory();
  const [city, setCity] = useState<string>();
  const { isLoading, data } = useQuery([city], () => searchListing(city));

  console.log(slug);

  useEffect(() => {
    setCity(slug);
  }, [slug]);

  return (
    <SlideUp setMarginBottom={true}>
      <HeaderMain />
      <VStack w="100%" mt={5}>
        {isLoading && (
          <Center maxW="8xl" w="full">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="brad.500"
              size="xl"
            />
          </Center>
        )}

        <SimpleGrid
          sx={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 329px)) ",
          }}
          w="full"
          maxW="8xl"
          spacing="10"
        >
          {data &&
            data.data?.map((item, index) => (
              <VStack
                cursor="pointer"
                pb={2}
                maxW={340}
                onClick={() =>
                  history.push({
                    pathname: `/details/${item.slug}`,
                    state: item._id,
                  })
                }
                shadow="md"
                rounded="md"
              >
                <Swiper
                  effect="fade"
                  className="w-full"
                  slidesPerView={1}
                  autoplay={true}
                  pagination={{ clickable: true }}
                >
                  {item.images.map((image, index) => (
                    <SwiperSlide>
                      <Box
                        bgImage={`url(http://localhost:7000/${image})`}
                        roundedTop="md"
                        w="full"
                        h="220px"
                        bgSize="cover"
                        bgPos="center"
                        bgRepeat="no-repeat"
                      >
                        <Tag
                          size="md"
                          bg="white"
                          variant="subtle"
                          m={3}
                          fontWeight="semibold"
                        >
                          ${item.cost}
                        </Tag>
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <VStack spacing="2" flex="1" p={2} alignItems="stretch">
                  <Text
                    className="font-railway"
                    fontSize="md"
                    color="brand.700"
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
      </VStack>
    </SlideUp>
  );
}
