import React, { useState } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import dayjs from 'dayjs';
import api from '../utils/api';

const Trip = ({ trip }) => {
  const [selected, setSelected] = useState(false);

  // function to use PUT method and send the good trip
  const handleBookTrip = (tripId) => {
    api
      .put(`book/${tripId}`)
      .then(() => {
        setSelected(true);
      })
      .catch((error) => {
        setSelected(false);
        console.log(error);
      });
    // to show a green badge when the booking is successful
    setTimeout(() => {
      setSelected(false);
    }, 3000);
  };

  return (
    <Card className='m-3' style={{ width: '30rem' }}>
      <Card.Header style={{fontWeight: 'bold'}}>
      {trip.arrivalStop}</Card.Header>

      <Card.Body>
        <Card.Text>
          Heure de départ : {dayjs(trip.departureTime).format('HH:mm')}
        </Card.Text>
        <Card.Text>
          Heure d'arrivée : {dayjs(trip.arrivalTime).format('HH:mm')}
        </Card.Text>
        <Button variant='primary' onClick={() => handleBookTrip(trip.id)}> 
          Réserver ce trajet
        </Button>
        {selected && (
          <Badge bg='success' className='p-1 m-1 w-20 fade-in'>
            Trajet réservé
          </Badge>
        )}
      </Card.Body>
    </Card>
  );
};

export default Trip;
