import { Container } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

export const VehicleSearchBar = () => {
  return (
    <div className="pb-5 mt-5 pt-5">
      <Container className="d-flex justify-content-center">
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          style={{ width: "50%" }}
        />
        <Button
          className="mx-5"
          variant="outline-secondary"
          type="submit"
        >
          Search
        </Button>
      </Container>
    </div>
  );
};

export default VehicleSearchBar;
