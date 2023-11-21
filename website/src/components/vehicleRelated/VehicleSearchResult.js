import { Container, Row } from "react-bootstrap";
import VehicleSortBtn from "./VehicleSortBtn";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

export const VehicleSearchResult = () => {
  return (
    <div className="bg-primary p-2">
        <Container>
     
        <Stack className="d-flex justify-content-center"
        direction="horizontal"
        gap={5}
      >
    
        <h3 className="result-display-text">{"vehicleNumber"} Véhicules trouvés</h3>
        <div style={{ width: "10%" }}></div>
        <VehicleSortBtn />
      </Stack>
     
      </Container>
    </div>
  );
};
