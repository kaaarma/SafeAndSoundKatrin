import React from 'react';
import './App.css';
import { Signin } from "./components/Signin";
import RegistrationForm from "./components/RegistrationForm";
import { Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import RequestForm from "./components/RequestForm";
import SeeOffers from "./components/SeeOffers";
import OfferForm from "./components/OfferForm";
import SeeRequestsForm from "./components/SeeRequests";
import Confirmation from "./components/Confirmation";
import Profile from "./components/Profile";
import Routing from "./Routing";
import RequestConfirmation from "./components/RequestConfirmation";
import img10 from './images/img10.jpg';


function App() {

  return (
      <div className="App">
          <Navigation />
             <main>
                <Routing />
             </main>
          <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: `url(${img10})`, backgroundAttachment:"fixed", backgroundSize: "cover", height: "100vh"
          }}>
              <div
                  style={{
                      width: "40%",
                      backgroundColor: "#c8cbad",
                      borderRadius: "20px",
                      padding: "20px",
                      marginTop: "50px",
                      marginLeft: "200px",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: 0.8
                  }}
              >
              <h1>Welcome to Safe & Sound,</h1>
                  <p> the easiest and most convenient way to get around Estonia!

                      Our app connects you with a network of cars near you. Say goodbye to the hassle of car ownership and hello to the freedom of car sharing.</p>
      </div>
      </div>
      </div>
  );
}

export default App;

