import Back from "../../../components/Back.component";
import Button from "../../../components/Button.component";
import { Link } from "react-router-dom";

import Form from "../../../components/Form.component";

export default function Login() {
  return (
    <div className="flex h-screen">
      <div className="flex-2 bg-300 ">
        <Back />
      </div>
      <div className="  flex flex-col flex-3">
        <p className="p-4 text-right font-semibold font-sand">
          Don’t have an account ?{" "}
          <span className="font-semibold font-sand text-500 cursor-pointer">
            <Link to="/owner/signup">Register</Link>
          </span>
        </p>
        <div className="px-28  pt-12">
          <h1 className="text-lg pb-7 font-extrabold text-black font-sand tracking-widest ">
            🏚️Bayt
          </h1>

          <h1 className="   text-3xl mb-2 font-bold text-500 subpixel-antialiased font-railway tracking-wide">
            Login
          </h1>
          <p className="text-gray-500 font-semibold text-base tracking-wider font-sand mb-10">
            Start Connecting with tenent 👨‍👩‍👦
          </p>
          <form className=" mt-6 flex flex-col font-sand ">
            <Form title="email" type="text">
              Email
            </Form>

            <Form title="password" type="password">
              Password
            </Form>

            <Button>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
