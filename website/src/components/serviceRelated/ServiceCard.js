import { Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";


function ServiceCard({ service }) {
    return (
    
      <Card style={{ width: '18rem', border: "2px dotted #ff6550", backgroundColor: 'transparent' }} className="m-1">
      <Card.Body>
        <Card.Title  className="text-primary vehicle-card-title" >{service.name}</Card.Title>
        <Card.Text  className="text-light mb-4">
        {service.description}
        </Card.Text>
          <h3 className="text-center vehicle-card-price mt-4 text-light" style={{ fontSize: "1.3em"}}>
            <p>{service.min_price}€ 
            <Badge
              bg="secondary"
              className="align-top bg-none text-primary p-0"
              style={{ fontSize: "0.5em" }}
            >
              TTC
            </Badge>
            Min</p>
        
          </h3>
      </Card.Body>
    </Card>
    );
  }
  export default ServiceCard;

