import { BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Back() {
  return (
    <p className=" font-sand bg-50 m-3 rounded-md w-20 font-semibold text-left flex items-center text-lg cursor-pointer">
      <BsChevronLeft />
      <Link to="/">
        {" "}
        <span className="pl-2">Back</span>
      </Link>{" "}
    </p>
  );
}
