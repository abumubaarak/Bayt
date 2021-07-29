 import {
  RiDashboardLine,
   RiSecurePaymentLine,
} from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
 import { FiUsers, FiHome } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import Logo from "../../../assets/logo.svg";
 import SlidenavItem from "./SlidenavItem.component";
import Slidenav from "./Slidernav.component";
const size="w-6 h-6"
const routes = [
  {
    path: "dashboard",
    icon:<FiHome className={size}/>
  },
  {
    path: "listings",
    icon:<RiDashboardLine  className={size}/>
  },
  {
    path: "tenants",
    icon:<FiUsers className={size}/>
  },
  {
    path: "message",
    icon:<BiMessageSquareDetail className={size}/>
  },
  {
    path: "payments",
    icon:<RiSecurePaymentLine className={size}/>
  },
  {
    path: "profile",
    icon:<CgProfile className={size}/>
  },
];
export default function Slidebar() {
  

  return (
    <>
      <span className="w-11 h-10 rounded-lg shadow-2xl  text-xl flex justify-center items-center pb-1  bg-400">
        🏚️
      </span>

      <Slidenav>
        {routes.map(({path,icon}, index) => (
          <SlidenavItem key={index} path={path} >
              {icon}
          </SlidenavItem>
        ))}
      </Slidenav>
    </>
  );
}
