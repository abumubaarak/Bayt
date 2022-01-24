export const formatCurrency = (value: string) => {
   const amount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
   }).format(+value);

   return amount;
};

export const getCookie = (name: string) => {
   let matches = document.cookie.match(
      new RegExp(
         "(?:^|; )" +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
      )
   );
   return matches ? decodeURIComponent(matches[1]) : undefined;
};
