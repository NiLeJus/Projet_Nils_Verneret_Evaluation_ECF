import ServiceList from '../components/serviceRelated/ServiceList';
import { Container } from 'react-bootstrap';

export const Service = () =>
{
    
    return (
      <div className='bg-dark p-5'>
        <Container>
        <ServiceList/>
        </Container>
      </div>      
      );
}

export default Service;
