import React from "react";
import LandingPage from "./components/LandingPage";
import Nav from "./components/Nav";
import DisqualificationPage from "./components/DisqualificationPage";
import { Route } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";

function App() {
  return (
    <div className="App">
      <nav>
        <Nav />
      </nav>
      <Route exact path="/">
        <section className="landing-page">
          <LandingPage />
        </section>
      </Route>
      <Route exact path="/disqualified">
        <section className="disqualify-page">
          <DisqualificationPage />
        </section>
      </Route>
      <Route exact path="/create-account">
        <section className="create-account-page">
          <CreateAccount />
        </section>
      </Route>
    </div>
  );
}

export default App;
