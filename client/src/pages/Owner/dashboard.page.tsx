import {
   Avatar,
   Grid,
   GridItem,
   HStack,
   Icon,
   Spacer,
   Text,
   VStack,
} from "@chakra-ui/react";
import InsightCard from "@components/InsightCard.component";
import InsightListing from "@components/InsightListing.component";
import Loading from "@components/Loading.component";
import WelcomeTitle from "@components/WelcomeTitle.component";
import { useInsight } from "@hooks/useApi";
import LandlordLayoutWrap from "@layouts/landlordLayoutWrap.layout";
import { formatCurrency } from "@utils/utils";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { BsPeople } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import {
   IoArrowForwardOutline,
   IoChevronForwardOutline,
} from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { useHistory } from "react-router";

export default function Dashboard() {
   const { data: insight, isLoading } = useInsight();
   const history = useHistory();
   const [amount, setAmount] = useState<number[]>([0, 0, 0, 0]);

   const options: ApexCharts.ApexOptions = {
      chart: {
         type: "area",
         toolbar: {
            show: false,
         },
         zoom: {
            enabled: false,
         },
      },

      colors: ["#0065e6"],

      dataLabels: {
         enabled: false,
      },
      stroke: {
         curve: "smooth",
         width: 5,
      },
      fill: {
         colors: ["#0065e6"],
      },
      markers: {
         colors: ["#000b21", "#E91E63", "#9C27B0"],
         size: 0,
         strokeWidth: 10,
      },
      xaxis: {
         labels: {
            style: {
               fontWeight: "600",
            },
         },
         categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
         ],
      },
      yaxis: {
         opposite: false,
         labels: {
            style: {
               fontWeight: "600",
            },
         },
      },

      grid: {
         xaxis: {
            lines: {
               show: false,
            },
         },
         yaxis: {
            lines: {
               show: true,
            },
         },
      },
   };

   const series = [
      {
         name: "Revenue",
         data: amount,
      },
   ];

   useEffect(() => {
      setAmount(insight?.data.revenue!);
   }, [insight?.data.revenue]);
   return (
      <LandlordLayoutWrap title='' enable={false}>
         <WelcomeTitle />
         <Grid
            h='600px'
            w='full'
            mt='20'
            templateRows='80px repeat(3, 1fr)'
            templateColumns='repeat(4, 1fr)'
            gap={5}>
            <GridItem rowSpan={1} bg='white' shadow='sm' rounded='lg'>
               <InsightCard
                  color='brand'
                  isLoading={isLoading}
                  label='Revenue Generated'
                  value={`${formatCurrency(
                     String(insight?.data.stats?.[0].revenue!)
                  )}`}
                  icon={MdAttachMoney}
               />
            </GridItem>
            <GridItem rowSpan={1} bg='white' shadow='sm' rounded='md'>
               <InsightCard
                  color='green'
                  isLoading={isLoading}
                  label=' Active Property'
                  value={insight?.data.stats?.[1].active?.[0].activeListing!}
                  icon={FiHome}
               />
            </GridItem>
            <GridItem rowSpan={1} bg='white' shadow='sm' rounded='md'>
               <InsightCard
                  color='orange'
                  isLoading={isLoading}
                  label='Occupied Property'
                  value={insight?.data.stats?.[1].occupied?.[0].occupied!}
                  icon={BsPeople}
               />
            </GridItem>
            <GridItem
               py={3}
               px={4}
               bg='white'
               shadow='md'
               rounded='md'
               rowSpan={4}>
               <HStack cursor='pointer' w='full'>
                  <Text
                     fontWeight='semibold'
                     fontFamily='heading'
                     color=''
                     fontSize='xl'>
                     Listings
                  </Text>
                  <Spacer />
                  <HStack color='gray.400' spacing='0'>
                     <Text
                        onClick={() => history.push("listings")}
                        fontWeight='medium'
                        fontSize='md'>
                        Show all
                     </Text>
                     <Icon as={IoChevronForwardOutline} />
                  </HStack>
               </HStack>

               {isLoading && <Loading />}
               {insight?.data.properties.map((listing) => (
                  <InsightListing property={listing} />
               ))}
            </GridItem>
            <GridItem
               rowSpan={3}
               colSpan={2}
               bg='white'
               py={5}
               px={4}
               shadow='md'
               rounded='md'>
               <HStack cursor='pointer' w='full'>
                  <Text
                     fontWeight='semibold'
                     fontFamily='heading'
                     color=''
                     fontSize='xl'>
                     Revenue Overview
                  </Text>
               </HStack>
               <ReactApexChart
                  options={options}
                  series={series}
                  type='area'
                  width='100%'
                  height={400}
               />
            </GridItem>
            <GridItem
               rowSpan={3}
               colSpan={1}
               bg='white'
               py={5}
               px={4}
               shadow='md'
               rounded='md'>
               <HStack cursor='pointer' w='full'>
                  <Text
                     fontWeight='semibold'
                     fontFamily='heading'
                     color=''
                     fontSize='xl'>
                     Tenant Request
                  </Text>
                  <Spacer />
                  <HStack color='gray.400' spacing='0'>
                     <Text
                        onClick={() => history.push("tenants")}
                        fontWeight='medium'
                        fontSize='md'>
                        Show all
                     </Text>
                     <Icon as={IoChevronForwardOutline} />
                  </HStack>
               </HStack>
               {isLoading && <Loading />}

               {insight?.data.tenantRequest.map(({ request, owner_id }) => (
                  <HStack alignItems='start' h='50' w='full' mt='5' spacing='2'>
                     <Avatar size='md' name='Abdulquadri Ismail' />

                     <VStack
                        h='100'
                        flex='1'
                        spacing='1'
                        justifyContent='flex-start'
                        alignItems='flex-start'>
                        <Text
                           fontWeight='semibold'
                           fontFamily='heading'
                           fontSize='sm'>
                           {owner_id.firstname + " " + owner_id.lastname}
                        </Text>
                        <Text
                           fontSize='sm'
                           fontWeight='semibold'
                           noOfLines={1}
                           color='gray.500'>
                           {request}
                        </Text>
                     </VStack>

                     <HStack
                        bg='purple.100'
                        color='purple.600'
                        alignSelf='center'
                        cursor='pointer'
                        alignItems='center'
                        rounded='full'
                        px='2'
                        py='1'
                        spacing='1'>
                        <Text
                           fontWeight='semibold'
                           onClick={() => history.push("tenants")}
                           fontSize='sm'>
                           View
                        </Text>
                        <Icon as={IoArrowForwardOutline} />
                     </HStack>
                  </HStack>
               ))}
            </GridItem>
         </Grid>
      </LandlordLayoutWrap>
   );
}
