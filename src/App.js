import { useState } from 'react';
import {
  Container,
  Card,
  InputGroup,
  FormControl,
  Badge,
} from 'react-bootstrap';
import { fetchWeather } from './api';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(query);

      setWeather(data);
      setQuery('');
    }
  };

  return (
    <Container className='py-5'>
      <h1 className='display-5 mb-3'>Weather Progressive Web App</h1>
      <p className='lead'>Built Using React, Bootstrap & OpenWeatherMap API</p>
      <Card>
        <InputGroup className='mb-3'>
          <FormControl
            className='m-3'
            placeholder='Type City and Enter...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </InputGroup>

        {weather.main && (
          <Card.Body className='text-center'>
            <Card.Title>
              <span>{weather.name}</span>
              <sup>
                {' '}
                <Badge bg='danger'>{weather.sys.country}</Badge>{' '}
              </sup>
            </Card.Title>
            <Card.Title>
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
            </Card.Title>
            <Card.Text>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p className='lead'>{weather.weather[0].description}</p>
            </Card.Text>
          </Card.Body>
        )}
      </Card>
    </Container>
  );
};

export default App;
