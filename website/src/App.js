import { Home } from "./screens/Home";
import { Vehicles } from "./screens/Vehicles";
import { Service } from "./screens/Service";
import { Admin } from "./screens/Admin";
import { Test } from "./screens/Test";
import { VehicleDetails } from "./screens/VehicleDetails";
import { ReactComponent as Logo } from "./visuals/brand/LOGO_Motor.svg";
import { FooterComp } from "../src/components/general/FooterComp";
import { VehicleDetailsForm } from "./screens/VehicleDetailsForm";
import { UserLeaveATestimony } from "./screens/UserLeaveATestimony";

import "./styles/main.css";
import { Routes, Route, NavLink } from "react-router-dom";

const navLinkStyle = ({ isActive }) => ({
  margin: "0 100px",
  fontSize: "1.3em",
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: "bold",
  textTransform: "uppercase",
  textDecoration: "none",
  color: isActive ? "#EFEFEF" : "#EA6D2A",
});

function App() {
  return (
    <>
      <div>
        <div className="">
          <nav className="pt-1 pb-2 ">
            <div className="container d-flex align-items-center justify-content-center">
              <Logo className="navbar-logo" />

              <NavLink
                to="/"
                style={navLinkStyle}
              >
                Nous <br /> Connaitre
              </NavLink>
              <NavLink
                to="/services-catalogue"
                style={navLinkStyle}
              >
                Nos <br />
                Services
              </NavLink>
              <NavLink
                to="/vehicles"
                style={navLinkStyle}
              >
                Nos <br />
                Vehicules
              </NavLink>
            </div>
          </nav>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/services-catalogue"
              element={<Service />}
            />
            <Route
              path="/vehicles"
              element={<Vehicles />}
            />
            <Route
              path="/test"
              element={<Test />}
            />
            <Route
              path="/vehicleDetails/:vehicleId"
              element={<VehicleDetails />}
            />

            <Route
              path="/admin"
              element={<Admin />}
            />

            <Route
              path="/vehicleForm"
              element={<VehicleDetailsForm />}
            />

            <Route 
             path="/leaveTestimony"
             element={<UserLeaveATestimony/>}
            />
          </Routes>
        </div>
      </div>
      <footer className="bg-dark">
        <FooterComp />
      </footer>
    </>
  );
}

export default App;
