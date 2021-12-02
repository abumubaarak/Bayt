export const formatCurrency = (value: string) => {
   const amount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
   }).format(+value);

   return amount;
};
