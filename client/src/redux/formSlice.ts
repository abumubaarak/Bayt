import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormState {
   location?: ILocation;
   property?: IProperty;
   others?: IOthers;
}

export interface ILocation {
   name: string;
   city: string;
   address: string;
}

export interface IOthers {
   cost: number | undefined;
   description: string;
   images: string[];
}

export interface IProperty {
   propertySize: number | undefined;
   avaliableBedroom: number | undefined;
   roomSize: number | undefined;
   avaliableBathroom: number | undefined;
   propertyType: string;
   rules: string[];
   amenities: string[];
}

export const initialState = {
   location: {
      name: "",
      city: "",
      address: "",
   },
   property: {
      propertySize: undefined,
      avaliableBedroom: 0,
      roomSize: undefined,
      avaliableBathroom: 0,
      propertyType: "",
      rules: [],
      amenities: [],
   },
   others: {
      cost: undefined,
      description: "",
      images: [],
   },
} as FormState;

export const formSlice = createSlice({
   name: "form",
   initialState,
   reducers: {
      setLocation(state, action: PayloadAction<FormState>) {
         state.location = action.payload.location;
      },
      setProperty(state, { payload }: PayloadAction<FormState>) {
         state.property = payload.property;
      },
      setOthers(state, { payload }: PayloadAction<FormState>) {
         state.others = payload.others;
      },
   },
});

export const { setLocation, setProperty, setOthers } = formSlice.actions;

export default formSlice.reducer;
