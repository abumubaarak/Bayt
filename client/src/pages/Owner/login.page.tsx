import { Button } from "@chakra-ui/react";
import Back from "@components/Back.component";
import Form from "@components/Form.component";
import usePost from "@hooks/usePost";
import useToastMessage from "@hooks/useToastMessage";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

type Inputs = {
   email: string;
   password: string;
};
export default function LoginPage() {
   const { register, handleSubmit, formState } = useForm<Inputs>();
   const { message } = useToastMessage();
   const history = useHistory();
   const { request, error, loading, response } = usePost("/auth/login");

   const onSubmit = (data: Inputs) => {
      const { email, password }: Inputs = data;

      request({ email, password });
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
         window.localStorage.setItem("id", response?.id!);
         window.localStorage.setItem("access_token", response?.access_token!);

         message({
            position: "top",
            title: "Done",
            duration: 5000,
            description: response?.success && "Login Successful",
            status: "success",
         });
         setTimeout(() => {
            history.push("/owner/dashboard");
         }, 1000);
      }
   }, [response]);

   useEffect(() => {
      const { errors } = formState;

      setTimeout(() => {
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
      }, 1000);
   }, [formState]);

   return (
      <div className='flex h-screen'>
         <div className='flex-2 bg-gradient '>
            <Back />
         </div>
         <div className='  flex flex-col flex-3'>
            <p className='p-4 text-right font-semibold font-sand'>
               Don’t have an account ?{" "}
               <span className='font-semibold font-sand text-500 cursor-pointer'>
                  <Link to='/owner/signup'>Register</Link>
               </span>
            </p>
            <div className='px-32  pt-12'>
               <h1 className='text-lg pb-7 font-extrabold text-black font-sand tracking-widest '>
                  🏚️Bayt
               </h1>

               <h1 className='   text-3xl mb-2 font-bold text-500 subpixel-antialiased font-railway tracking-wide'>
                  Login
               </h1>
               <p className='text-gray-500 font-semibold text-base tracking-wider font-sand mb-10'>
                  Start Connecting with tenent 👨‍👩‍👦
               </p>
               <form
                  className=' mt-6 flex flex-col font-sand '
                  onSubmit={handleSubmit(onSubmit)}>
                  <Form
                     title='email'
                     type='text'
                     register={register("email", { required: true })}>
                     Email
                  </Form>

                  <Form
                     title='password'
                     type='password'
                     register={register("password", { required: true })}>
                     Password
                  </Form>

                  <Button type='submit'>Submit</Button>
               </form>
            </div>
         </div>
      </div>
   );
}
