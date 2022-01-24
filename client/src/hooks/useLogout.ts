export const useLogout = () => {
   const logout = () => {
      window.localStorage.clear();
      document.cookie.split(";").forEach(function (c) {
         document.cookie = c
            .replace(/^ +/, "")
            .replace(
               /=.*/,
               "=;expires=" + new Date().toUTCString() + ";path=/"
            );
      });
      window.location.href = window.location.origin;
   };

   return { logout };
};
