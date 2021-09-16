import { Route, Switch } from "react-router";
import Search from "./components/Search.component";
import Header from "./components/Header.component";
import Home from "./pages/Home.page";
import LandintText from "./components/LandingText.component";
import Signup from "./pages/Owner/Authentication/Signup.page";
import Login from "./pages/Owner/Authentication/Login.page";
import Slidebar from "./components/Slidebar.component";
import Dashboard from "./pages/Owner/Home/Dashboard.page";
import Listings from "./pages/Owner/Home/Listings.page";
import Message from "./pages/Owner/Home/Message.page";
import Tenants from "./pages/Owner/Home/Tenants.page";
import Payments from "./pages/Owner/Home/Payments.page";
import Profile from "./pages/Owner/Home/Profile.page";
import Layout from "./layouts/owner.layout";
import Property from "./pages/Owner/Home/AddProperty.page";
import ListingPage from "./pages/tenent/listing/Listing.page";
import DetailsPage from "./pages/tenent/details/Details.Page";
import HeaderMain from "./components/HeaderMain.component";
import ProfilePage from "./pages/tenent/profile.page";
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
    path: "/owner/tenents",
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
  return (
    <Switch>
      <Route path="/" exact>
        <Home header={<HeaderMain variant="home" />}>
          <LandintText />
          <Search />
        </Home>
      </Route>
      <Route path="/owner/signup">
        <Signup />
      </Route>
      <Route path="/profile">
        <ProfilePage />
      </Route>
      <Route path="/s/:slug">
        <ListingPage />
      </Route>
      <Route path="/details/:slug" component={DetailsPage} />

      <Route path="/owner/login">
        <Login />
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
      <Route path="/owner/list/new">
        <Property />
      </Route>
    </Switch>
  );
}
export default App;
