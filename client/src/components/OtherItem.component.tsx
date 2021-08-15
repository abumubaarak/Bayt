import React from "react";
import { FC } from "react";

import { AiOutlineWifi } from "react-icons/ai";
import {
  GiFire,
  GiWoodenChair,
  GiAirtightHatch,
  GiCctvCamera,
} from "react-icons/gi";
import { RiPlantLine } from "react-icons/ri";
import { MdHotTub, MdNotInterested } from "react-icons/md";
import { RiStore3Line } from "react-icons/ri";
import { BiCar } from "react-icons/bi";
import { GoRepoForcePush } from "react-icons/go";
import { CgGym, CgSmartHomeWashMachine } from "react-icons/cg";
import { Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { IoLogoOctocat } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
interface Props {
  title: string;
  isAmenities: boolean;
}
const amenities = [
  {
    narration: "Wifi",
    item: "wifi",
    icon: AiOutlineWifi,
  },
  {
    narration: "Lift",
    item: "lift",
    icon: GoRepoForcePush,
  },
  {
    narration: "Dryer",
    item: "dryer",
    icon: MdHotTub,
  },
  {
    narration: "Gym",
    item: "gym",
    icon: CgGym,
  },

  {
    narration: "Storage",
    item: "storage",
    icon: RiStore3Line,
  },
  {
    narration: "Furnished",
    item: "furnished",
    icon: GiWoodenChair,
  },

  {
    narration: "Garden",
    item: "garden",
    icon: RiPlantLine,
  },
  {
    narration: "Fireplace",
    item: "fire",
    icon: GiFire,
  },
  {
    narration: "Washing machine",
    item: "washing_machine",
    icon: CgSmartHomeWashMachine,
  },
  {
    narration: "Parking",
    item: "parking",
    icon: BiCar,
  },
  {
    narration: "Cctv",
    item: "cctv",
    icon: GiCctvCamera,
  },
  {
    narration: "Air Condition",
    item: "air",
    icon: GiAirtightHatch,
  },
];

const rules = [
  {
    narration: "Cat Allowed",
    item: "cat",
    icon: IoLogoOctocat,
  },
  {
    narration: "No Pet",
    item: "zeropet",
    icon: MdNotInterested,
  },
  {
    narration: "Family Allowed",
    item: "family",
    icon: FiUser,
  },
];

const OtherItem: FC<Props> = ({ title, isAmenities }) => {
   const list = isAmenities ? amenities : rules;

  return (
    <>
      {list.map(({ narration, item, icon }) => (
        <>
          {title === item && (
            <HStack className="font-railway" alignItems="center" spacing="5">
              <Icon as={icon} w={8} h={8} color="gray.700" />
              <Text fontSize="lg" fontWeight="medium">
                {narration}
              </Text>
            </HStack>
          )}
        </>
      ))}
    </>
  );
};

export default OtherItem;
