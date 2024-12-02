import { Home } from "./screens/Home";
import { Vehicles } from "./screens/Vehicles";
import { Service } from "./screens/Service";
import { Admin } from "./screens/Admin";
import { Test } from "./screens/Test";
import { VehicleDetails } from "./screens/VehicleDetails";
import { FooterComp } from "../src/components/general/FooterComp";
import { VehicleDetailsForm } from "./screens/VehicleDetailsForm";
import { UserLeaveATestimony } from "./screens/UserLeaveATestimony";
import { Navbar } from "react-bootstrap";
import { Helmet } from "react-helmet";
import "./styles/main.css";
import { Routes, Route, NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';


const navLinkStyle = ({ isActive }) => ({
  margin: "0 10vw",
  fontSize: "1.3em",
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: "bold",
  textTransform: "uppercase",
  textDecoration: "none",
  color: isActive ? "#EFEFEF" : "#EA6D2A",
});

function App() {

  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>Garage VP</title>
        <meta
          name="Garage Vincent Parrot"
          content="Le meilleur garage"
        />
        <meta charSet="utf-8" />
        <meta
          name="keywords"
          content="garage, voiture"
        />
      </Helmet>
      <div>
        <Navbar
          sticky="top"
          className="pt-1 pb-2 bg-dark mx-auto"
        >
          <div className="container d-flex align-items-center justify-content-center">
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
        </Navbar>
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
            element={<UserLeaveATestimony />}
          />
        </Routes>
      </div>
     {location.pathname !== "/admin" && <FooterComp className="bg-dark"/>}
    </>
  );
}

export default App;
