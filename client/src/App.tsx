import Form from "./components/Form.component";
import Header from "./components/Header.component";
import Homepage from "./components/Homepage";
import LandintText from "./components/LandingText.component";

function App() {
  return (
    <div>
      <Homepage header={<Header/>}>
        <LandintText />
        <Form />
      </Homepage>
    </div>
  );
}

export default App;
