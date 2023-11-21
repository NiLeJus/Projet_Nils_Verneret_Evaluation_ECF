import { Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import teamImage from "../visuals/team_about.png";

export const AboutSect = () => {
  return (
    <>
      <div className="bg-primary">
        <Container className="pb-5 ">
          <Row className="text-center">
            <Col md={3}>
              <h1 className="text-dark"> 15 </h1>
              <h2 className="text-stats">Années d'expérience</h2>
            </Col>
            <Col md={3}>
              <h1 className="text-dark"> 10 </h1>
              <h2 className="text-stats">Collaborateur</h2>
            </Col>
            <Col md={3}>
              <h1 className="text-dark"> +1000 </h1>
              <h2 className="text-stats">Véhicules réparés cette année</h2>
            </Col>
            <Col md={3}>
              <h1 className="text-dark"> 351 </h1>
              <h2 className="text-stats">Véhicules vendus</h2>
            </Col>
          </Row>
        </Container>
      </div>

        <div bg-dark></div>
        <div className="bg-dark">
      <Container className="pb-5">
        <Row>
          <Col
            className=""
            sm={7}
          >
            <h1>
              {" "}
              Qui sommes <br /> nous ?{" "}
            </h1>

            <p className="indent-p">
              Au cœur de Toulouse se trouve le Garage V. Parrot, une entreprise
              dédiée à la passion de l'automobile et à la confiance de ses
              clients. Notre histoire commence avec Vincent Parrot, un expert
              automobile qui a consacré plus d'une décennie à perfectionner son
              art dans le monde de la réparation et de l'entretien des voitures.
              15 années d'expérience ont façonné Vincent non seulement en tant
              que mécanicien compétent, mais aussi en tant que personne qui
              comprend la valeur d'une voiture pour son propriétaire. Pour
              beaucoup, une voiture n'est pas qu'un simple moyen de transport ;
              elle est le reflet de leur personnalité, un partenaire de
              confiance lors de leurs déplacements quotidiens et un symbole de
              liberté.
            </p>
          </Col>
          <Col sm={5}>
            <Image
              className="team-image mt-5 px-5"
              src={teamImage}
              fluid
            />
          </Col>
        </Row>
      </Container>
      </div>
    </>
  );
};
