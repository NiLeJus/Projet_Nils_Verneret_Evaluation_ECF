import ServiceList from '../components/serviceRelated/ServiceList';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

export const Service = () =>
{
    
    return (
      <>
         <Helmet>
        <title>Nos Services</title>
        <meta
          name="description"
          content="Découvrez nos services"
        />
        <meta charSet="utf-8" />
        <meta
          name="keywords"
          content="garage, voiture"
        />
      </Helmet>
      <div className='bg-dark p-5'>
        <Container>
        <ServiceList/>
        </Container>
      </div>      
      </>
      );
}

export default Service;
