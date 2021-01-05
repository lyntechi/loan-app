import React, { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage";
import Nav from "./components/Nav";
import DisqualificationPage from "./components/DisqualificationPage";
import { Route } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";

function App() {
  //This apiData local state is for the json data im fetching. I was
  //trying to manage this state with my redux store I created to avoid prop drilling to other
  //components but having some issues and im trying to debug to see why my api data isnt reaching the redux store
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    fetch("db.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setApiData(data.messages[0]);
      });
  }, []);

  return (
    <div className="App">
      <nav>
        <Nav />
      </nav>
      <Route exact path="/">
        <section className="landing-page">
          <LandingPage apiData={apiData} />
        </section>
      </Route>
      <Route exact path="/disqualified">
        <section className="disqualify-page">
          <DisqualificationPage apiData={apiData} />
        </section>
      </Route>
      <Route exact path="/create-account">
        <section className="create-account-page">
          <CreateAccount apiData={apiData} />
        </section>
      </Route>
    </div>
  );
}

export default App;

