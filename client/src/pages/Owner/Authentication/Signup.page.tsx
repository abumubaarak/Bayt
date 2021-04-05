import { Link } from "react-router-dom";
import Back from "../../../components/Back.component";
import Button from "../../../components/Button.component";
import Form from "../../../components/Form.component";

export default function Signup() {
  return (
    <div className="flex h-screen">
      <div className="flex-2 bg-300 ">
        <Back />
      </div>
      <div className="  flex flex-col flex-3">
        <p className="p-4 text-right font-semibold font-sand">
          Already have an account ?{" "}
          <span className="font-semibold font-sand text-500 cursor-pointer">
            <Link to="/owner/login">Log in</Link>
          </span>
        </p>
        <div className="px-28  pt-12">
          <h1 className="text-lg pb-7 font-extrabold text-black font-sand tracking-widest ">
            🏚️Bayt
          </h1>

          <h1 className="   text-3xl mb-5 font-bold text-500 subpixel-antialiased font-railway tracking-wide">
            Create an Account
          </h1>
          <form className=" mt-6 flex flex-col font-sand ">
            <Form title="firstname" type="text">
              Firstname
            </Form>
            <Form title="lastname" type="text">
              Lastname
            </Form>
            <Form title="email" type="email">
              Email
            </Form>
            <Form title="password" type="password">
              Password
            </Form>
            <Form title="confirm password" name="con_password" type="password">
              Confirm Password
            </Form>

            <Button>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
