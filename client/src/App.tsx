import Header from "@components/Header.component";
import LandingText from "@components/LandingText.component";
import Search from "@components/Search.component";
import Slidebar from "@components/Slidebar.component";
import useToastMessage from "@hooks/useToastMessage";
import Layout from "@layouts/owner.layout";
import Home from "@pages/home.page";
import Property from "@pages/Owner/addProperty.page";
import Dashboard from "@pages/Owner/dashboard.page";
import Listings from "@pages/Owner/listings.page";
import LoginPage from "@pages/Owner/login.page";
import Message from "@pages/Owner/message.page";
import Payments from "@pages/Owner/payments.page";
import Profile from "@pages/Owner/profile.page";
import SignupPage from "@pages/Owner/signup.page";
import Tenants from "@pages/Owner/tenants.page";
import ListingPage from "@pages/tenant/listing.page";
import ListingDetailsPage from "@pages/tenant/listingDetails.Page";
import TenantMessage from "@pages/tenant/message.page";
import ProfilePage from "@pages/tenant/profile.page";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Switch } from "react-router";
const routes = [
   {
      path: "/owner/dashboard",
      exact: true,
      component: Dashboard,
   },
   {
      path: "/owner/listings",
      exact: true,
      component: Listings,
   },
   {
      path: "/owner/tenants",
      exact: true,
      component: Tenants,
   },
   {
      path: "/owner/message",
      exact: true,
      component: Message,
   },
   {
      path: "/owner/payments",
      exact: true,
      component: Payments,
   },
   {
      path: "/owner/profile",
      exact: true,
      component: Profile,
   },
];
function App() {
   const toast = useToastMessage();

   const query = new QueryClient({
      queryCache: new QueryCache({
         onError: (error: any, query: any) => {
            if (query.state.data !== undefined) {
               toast.error(`Something went wrong: ${error.message}`);
            }
         },
      }),

      defaultOptions: {
         queries: {
            refetchOnWindowFocus: false,
         },
      },
   });

   return (
      <QueryClientProvider client={query}>
         <Switch>
            <Route path='/' exact>
               <Home header={<Header variant='home' />}>
                  <LandingText />
                  <Search />
               </Home>
            </Route>
            <Route path='/owner/signup'>
               <SignupPage />
            </Route>
            <Route path='/profile'>
               <ProfilePage />
            </Route>
            <Route path='/message'>
               <TenantMessage />
            </Route>
            <Route path='/s/:slug'>
               <ListingPage />
            </Route>

            <Route path='/details/:slug' component={ListingDetailsPage} />

            <Route path='/owner/login'>
               <LoginPage />
            </Route>

            {routes.map(({ component: Component, path, exact }, index) => (
               <Route
                  key={index}
                  exact={exact}
                  path={path}
                  render={(props) => (
                     <Layout slidebar={<Slidebar />}>
                        <Component />
                     </Layout>
                  )}
               />
            ))}
            <Route path='/owner/list/new'>
               <Property />
            </Route>
         </Switch>
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   );
}
export default App;
