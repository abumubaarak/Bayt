import React, { ReactNode, useState } from "react";
import {
   Slider,
   SliderTrack,
   SliderFilledTrack,
   SliderThumb,
   Grid,
} from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import { IoLogoOctocat } from "react-icons/io5";
import { MdNotInterested } from "react-icons/md";
import { motion } from "framer-motion";
import Features from "../components/Features.component";
import { AiOutlineWifi } from "react-icons/ai";
import {
   GiFire,
   GiWoodenChair,
   GiAirtightHatch,
   GiCctvCamera,
} from "react-icons/gi";
import { RiPlantLine } from "react-icons/ri";
import { MdHotTub } from "react-icons/md";
import { RiStore3Line } from "react-icons/ri";
import { BiCar } from "react-icons/bi";
import { GoRepoForcePush } from "react-icons/go";
import { CgGym, CgSmartHomeWashMachine } from "react-icons/cg";
import SlideUp from "../transition/SlideUp.transition";
import PropertyInput from "../components/PropertyInput.component";
import { useForm } from "react-hook-form";
import { IProperty, setProperty } from "../redux/formSlice";
import FormTitle from "../components/FormTitle.component";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { FC } from "react";
import { LayoutProps } from "../pages/Owner/addProperty.page";
import HouseTypeGroup from "../components/HouseTypeGroup.component";
import HouseType from "../components/HouseType.component";
import FloatingText from "../components/FloatingText.component";

const PropertyDetails: FC<LayoutProps> = ({ setFormState }) => {
   const [tag, setTag] = React.useState<string>();
   const [activeAmenite, setActiveAmenites] = React.useState<string[]>([]);
   const [activeRules, setActiveRules] = React.useState<string[]>([]);
   const { register, watch, handleSubmit, getValues } = useForm<IProperty>();
   const state = useAppSelector((state) => state.form.property);
   const dispatch = useAppDispatch();
   const [bathRoomCount, setBathRoomCount] = useState<number | undefined>(
      state?.avaliableBathroom
   );
   const [bedroomCount, setBedroomCount] = useState<number | undefined>(
      state?.avaliableBedroom
   );
   const [houseType, setHouseType] = React.useState<string | undefined>(
      state?.propertyType
   );

   const rules = [
      {
         narration: "Cat Allowed",
         item: "cat",
         icon: <IoLogoOctocat className='w-full h-full' />,
      },
      {
         narration: "No Pet",
         item: "zeropet",
         icon: <MdNotInterested className='w-full h-full' />,
      },
      {
         narration: "Family Allowed",
         item: "family",
         icon: <FiUser className='w-full h-full' />,
      },
   ];
   const amenities = [
      {
         narration: "Wifi",
         item: "wifi",
         icon: <AiOutlineWifi className='w-full h-full' />,
      },
      {
         narration: "Lift",
         item: "lift",
         icon: <GoRepoForcePush className='w-full h-full' />,
      },
      {
         narration: "Dryer",
         item: "dryer",
         icon: <MdHotTub className='w-full h-full' />,
      },
      {
         narration: "Gym",
         item: "gym",
         icon: <CgGym className='w-full h-full' />,
      },

      {
         narration: "Storage",
         item: "storage",
         icon: <RiStore3Line className='w-full h-full' />,
      },
      {
         narration: "Furnished",
         item: "furnished",
         icon: <GiWoodenChair className='w-full h-full' />,
      },

      {
         narration: "Garden",
         item: "garden",
         icon: <RiPlantLine className='w-full h-full' />,
      },
      {
         narration: "Fireplace",
         item: "fire",
         icon: <GiFire className='w-full h-full' />,
      },
      {
         narration: "Washing machine",
         item: "washing_machine",
         icon: <CgSmartHomeWashMachine className='w-full h-full' />,
      },
      {
         narration: "Parking",
         item: "parking",
         icon: <BiCar className='w-full h-full' />,
      },
      {
         narration: "Cctv",
         item: "cctv",
         icon: <GiCctvCamera className='w-full h-full' />,
      },
      {
         narration: "Air Condition",
         item: "air",
         icon: <GiAirtightHatch className='w-full h-full' />,
      },
   ];

   const handleBathroomChange = (value: any) => setBathRoomCount(value);

   const handleBedroomChange = (value: any) => setBedroomCount(value);

   const handleAmenites = (tag: string, state: boolean) => {
      if (state) {
         setActiveAmenites(activeAmenite?.concat(tag));
      } else {
         setActiveAmenites(activeAmenite?.filter((value) => value !== tag));
      }
   };

   const handleRules = (tag: string, state: boolean) => {
      if (state) {
         setActiveRules(activeRules?.concat(tag));
      } else {
         setActiveRules(activeRules?.filter((value) => value !== tag));
      }
   };

   const handleHouseType = (titleType: string, active: boolean) => {
      if (active) {
         setHouseType(titleType);
      }
   };
   useEffect(() => {
      console.log(state?.avaliableBedroom);

      const { propertySize, roomSize } = getValues();

      dispatch(
         setProperty({
            property: {
               propertySize,
               avaliableBedroom: bedroomCount,
               roomSize,
               avaliableBathroom: bathRoomCount,
               propertyType: houseType!,
               rules: activeRules,
               amenities: activeAmenite,
            },
         })
      );

      if (
         propertySize &&
         roomSize &&
         activeAmenite.length > 0 &&
         activeRules.length > 0 &&
         houseType!.length > 0 &&
         bathRoomCount! > 0 &&
         bedroomCount! > 0
      ) {
         setFormState(false);
      } else {
         setFormState(true);
      }
   }, [
      watch("propertySize"),
      watch("roomSize"),
      activeAmenite,
      activeRules,
      houseType,
      bathRoomCount,
      bedroomCount,
   ]);

   return (
      <SlideUp>
         <form className='space-y-11 mb-28 '>
            <PropertyInput
               title="What's the size of the Property?"
               type='number'
               maxLength={4}
               value={state?.propertySize?.toString()}
               register={register("propertySize", { required: true })}
            >
               <FloatingText />
            </PropertyInput>

            <div>
               <FormTitle title='How many bedrooms?' />

               <Slider
                  flex='1'
                  focusThumbOnChange={false}
                  value={bedroomCount}
                  onChange={handleBedroomChange}
               >
                  <SliderTrack>
                     <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb
                     fontSize='lg'
                     boxSize='32px'
                     children={bedroomCount}
                  />
               </Slider>
            </div>

            <div>
               <PropertyInput
                  title="What's the size of the room?"
                  type='number'
                  value={state?.roomSize?.toString()}
                  maxLength={4}
                  register={register("roomSize", { required: true })}
               >
                  <FloatingText />
               </PropertyInput>
            </div>

            <div>
               <FormTitle title='How many bathrooms?' />
               <Slider
                  flex='1'
                  focusThumbOnChange={false}
                  value={bathRoomCount}
                  onChange={handleBathroomChange}
               >
                  <SliderTrack>
                     <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb
                     fontSize='lg'
                     boxSize='32px'
                     children={bathRoomCount}
                  />
               </Slider>
            </div>
            <div>
               <FormTitle title='Choose the place type' />

               <HouseTypeGroup>
                  <HouseType
                     title='Room'
                     active={houseType == "Room" && true}
                     setType={handleHouseType}
                  />
                  <HouseType
                     title='Apartment'
                     active={houseType == "Apartment" && true}
                     setType={handleHouseType}
                  />
                  <HouseType
                     title='Duplex'
                     active={houseType == "Duplex" && true}
                     setType={handleHouseType}
                  />
                  <HouseType
                     title='Loft'
                     active={houseType == "Loft" && true}
                     setType={handleHouseType}
                  />
               </HouseTypeGroup>
            </div>
            <div>
               <h3 className='font-bold tracking-wide text-2xl mb-4 font-railway text-gray-800'>
                  Any house rules?
               </h3>
               <Grid
                  templateColumns='repeat(3,56px)'
                  textAlign='center'
                  mt={4}
                  gap='10'
               >
                  {rules.map(({ narration, item, icon }, i) => (
                     <Features
                        title={narration}
                        key={i}
                        tag={item}
                        setTag={handleRules}
                     >
                        {icon}
                     </Features>
                  ))}
               </Grid>
            </div>
            <div>
               <h3 className='font-bold tracking-wide text-2xl mb-4 font-railway text-gray-800'>
                  Choose the amenities
               </h3>

               <Grid
                  templateColumns='repeat(4,62px)'
                  textAlign='center'
                  mt={7}
                  gap='10'
               >
                  {amenities.map(({ narration, item, icon }, i) => (
                     <Features
                        title={narration}
                        key={i}
                        tag={item}
                        setTag={handleAmenites}
                     >
                        {icon}
                     </Features>
                  ))}
               </Grid>
            </div>
         </form>
      </SlideUp>
   );
};

export default PropertyDetails;
