import { Route, Switch } from "react-router";
import Search from "./components/Search.component";
import Header from "./components/Header.component";
import Home from "./pages/Home.page";
import LandintText from "./components/LandingText.component";
import Signup from "./pages/Owner/Authentication/Signup.page";
import Login from "./pages/Owner/Authentication/Login.page";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home header={<Header />}>
          <LandintText />
          <Search />
        </Home>
      </Route>
      <Route path="/owner/signup">
        <Signup />
      </Route>
      <Route path="/owner/login">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
