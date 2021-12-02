import PaymentTable from "@components/PaymentTable.component";
import TenantLayoutWrap from "@layouts/tenantLayoutwrap.layout";
import React from "react";

export default function Payment() {
   return (
      <TenantLayoutWrap title='Payments'>
         <PaymentTable type='tenant' />
      </TenantLayoutWrap>
   );
}
