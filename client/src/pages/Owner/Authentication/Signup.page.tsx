import { Link, useHistory } from "react-router-dom";
import Back from "../../../components/Back.component";
import Button from "../../../components/Button.component";
import Form from "../../../components/Form.component";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useToastMessage from "../../../hooks/useToastMessage";
import usePost from "../../../hooks/usePost";

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  con_password: string;
};

export default function Signup() {
  const { register, handleSubmit, watch, formState } = useForm<Inputs>();
  const message = useToastMessage();
  const history= useHistory()
  const { registerUser, loading, response, error } = usePost();

  const onSubmit = (data: Inputs) => {
    if (data.password !== data.con_password) {
      message({
        position: "top-right",
        title: "Error",
        description: "Password does not match",
        status: "error",
      });
    } else {
      const value = JSON.stringify(data);
      const { firstname, lastname, email, password }: Inputs = data;

      let role: string = "owner";
      registerUser({ firstname, lastname, email, role, password });
    }
  };

  useEffect(() => {
    if (error) {
      message({
        position: "top",
        title: "Error",
        description: error?.message,
        status: "error",
      });
    }
  }, [error]);

  useEffect(() => {
    if (response) {

      message({
        position: "top",
        title: "Done",
        duration:5000,
        description: response?.message,
        status: "success",
      });

      setTimeout(() => {
        history.push("/dashboard")
      }, 5000);
    }
  }, [response]);
  useEffect(() => {
    const { errors } = formState;

    setTimeout(() => {
      if (errors.firstname) {
        message({
          position: "top-right",
          title: "Error",
          description: "Firstname is require",
          status: "error",
        });
        return;
      }

      if (errors.lastname) {
        message({
          position: "top-right",
          title: "Error",
          description: "Lastname is require",
          status: "error",
        });
        return;
      }

      if (errors.email) {
        message({
          position: "top-right",
          title: "Error",
          description: "Email is require",
          status: "error",
        });
        return;
      }

      if (errors.password) {
        message({
          position: "top-right",
          title: "Error",
          description: "Password is require",
          status: "error",
        });
        return;
      }

      if (!errors.password && errors.con_password) {
        message({
          position: "top-right",
          title: "Error",
          description: "Confirm Password is require",
          status: "error",
        });
        return;
      }
    }, 1000);
  }, [formState]);

  // console.log(watch("firstname")); // watch input value by passing the name of it

  return (
    <div className="flex h-screen">
      <div className="flex-2 h-screen bg-300 ">
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
          <h1 className="text-lg pb-4 font-extrabold text-black font-sand tracking-widest ">
            🏚️Bayt
          </h1>

          <h1 className="   text-3xl mb-5 font-bold text-500 subpixel-antialiased font-railway tracking-wide">
            Create an Account
          </h1>
          <form
            className=" mt-6 flex flex-col font-sand "
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form
              title="firstname"
              type="text"
              register={register("firstname", { required: true })}
            >
              Firstname
            </Form>

            <Form
              title="lastname"
              type="text"
              register={register("lastname", { required: true })}
            >
              Lastname
            </Form>
            <Form
              title="email"
              type="email"
              register={register("email", { required: true })}
            >
              Email
            </Form>
            <Form
              title="password"
              type="password"
              register={register("password", { required: true })}
            >
              Password
            </Form>
            <Form
              title="confirm password"
              name="con_password"
              type="password"
              register={register("con_password", { required: true })}
            >
              Confirm Password
            </Form>

            <Button loading={loading}>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
