import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import api from '../utils/api';
import Trip from './Trip';

const Selector = () => {

  const [stops, setStops] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    api
      .get(`stops`)
      .then((response) => {
        setStops(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleTrips = (event) => {
    event.preventDefault();
    api
      .get(`trips?departureStop=${event.target.value}`)
      .then((response) => {
        setTrips(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    
    <Container className='p-3 m-2 d-flex flex-column w-100'>
      <h1 className='header'>
        <a href='http://localhost:3000/'>Sélecteur de trajet</a>
      </h1>
      Choisisez votre arrêt
      <Form.Select className='m-3' style={{ width: '15rem' }} onChange={handleTrips}>
        {stops.map((stop, index) => (
          <option key={index} value={stop}>{stop}</option>
        ))}
      </Form.Select>
      <Container className='m-3 d-flex flex-wrap'>
        {trips.map.sort(((trip) => (
          <Trip key={trip.id} trip={trip} />
        )))}
      </Container>
    </Container>
  );
};

export default Selector;
