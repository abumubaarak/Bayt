import React, { useEffect } from "react";
import SlideUp from "../transition/SlideUp.transition";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILocation, setLocation } from "../redux/formSlice";
import PropertyInput from "../components/PropertyInput.component";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { LayoutProps } from "../pages/Owner/addProperty.page";

const Location: FC<LayoutProps> = ({ setFormState }) => {
   const { register, watch, handleSubmit, getValues } = useForm<ILocation>();
   const state = useAppSelector((state) => state.form.location);
   const dispatch = useAppDispatch();

   const getFormData: SubmitHandler<ILocation> = (data) => {
      setFormState(true);
   };

   useEffect(() => {
      const { address, city, name } = getValues();

      dispatch(
         setLocation({
            location: {
               name,
               city,
               address,
            },
         })
      );

      if (address && city && name) {
         setFormState(false);
      } else {
         setFormState(true);
      }
   }, [watch("name"), watch("address"), watch("city")]);

   return (
      <SlideUp>
         <form className='space-y-11' onSubmit={handleSubmit(getFormData)}>
            <PropertyInput
               title='Property Name'
               type='text'
               value={state?.name}
               register={register("name", { required: true })}
            />

            <PropertyInput
               title='City'
               type='text'
               value={state?.city}
               register={register("city", { required: true })}
            />

            <PropertyInput
               title='Street Address'
               type='text'
               value={state?.address}
               register={register("address", { required: true })}
            />
         </form>
         <p className='mt-3 font-light'>
            Add all the details to easily find the flat
         </p>
      </SlideUp>
   );
};

export default Location;
