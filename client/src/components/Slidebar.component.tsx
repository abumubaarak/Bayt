import { Image } from "@chakra-ui/image";
import { VStack } from "@chakra-ui/react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiHome, FiUsers } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { RiDashboardLine, RiSecurePaymentLine } from "react-icons/ri";
import Logo from "../assets/logo_icon.png";
import SlidenavItem from "./SlidenavItem.component";
import Slidenav from "./Slidernav.component";
const size = "w-6 h-6";
const routes = [
   {
      path: "dashboard",
      icon: <FiHome className={size} />,
   },
   {
      path: "listings",
      icon: <RiDashboardLine className={size} />,
   },
   {
      path: "tenants",
      icon: <FiUsers className={size} />,
   },
   {
      path: "message",
      icon: <BiMessageSquareDetail className={size} />,
   },
   {
      path: "payments",
      icon: <RiSecurePaymentLine className={size} />,
   },
   {
      path: "profile",
      icon: <CgProfile className={size} />,
   },
   {
      path: "logout",
      icon: <HiOutlineLogout className={size} />,
   },
];
export default function Slidebar() {
   return (
      <>
         <VStack spacing={14} w='100%' alignItems='center' pt={5}>
            <Image src={Logo} w='10' h={10} />

            <Slidenav>
               {routes.map(({ path, icon }, index) => (
                  <SlidenavItem key={index} path={path}>
                     {icon}
                  </SlidenavItem>
               ))}
            </Slidenav>
         </VStack>
      </>
   );
}
