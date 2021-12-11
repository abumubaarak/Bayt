import PaymentTable from "@components/PaymentTable.component";
import LandlordLayoutWrap from "@layouts/landlordLayoutWrap.layout";
import React from "react";

export default function Payments() {
   return (
      <LandlordLayoutWrap title='Payments' enable={true}>
         <PaymentTable type='landlord' />
      </LandlordLayoutWrap>
   );
}
