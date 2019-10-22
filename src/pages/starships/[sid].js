import fetch from 'isomorphic-unfetch';
import React from 'react';
import Layout from '../../components/Layout';

const StarShipPost = props => {
  const numberWithCommas = x =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <Layout>
      <div>
        <h1>{props.ship.name}</h1>
        <ul>
          <li>Model: {props.ship.model}</li>
          <li>Manufacturer: {props.ship.manufacturer}</li>
          <li>Crew: {numberWithCommas(props.ship.crew)}</li>
          <li>Passengers: {numberWithCommas(props.ship.passengers)}</li>
          <li>Hyperdrive Rating: {props.ship.hyperdrive_rating}</li>
          <li>Starship Class: {props.ship.starship_class}</li>
          {props.ship.pilots.length >= 1 && (
            <li>
              {props.ship.pilots.length === 1
                ? `Pilot: ${props.ship.pilots[0]}`
                : `Pilots: ${props.ship.pilots.join(', ')}`}
            </li>
          )}
        </ul>
      </div>
    </Layout>
  );
};

StarShipPost.getInitialProps = async context => {
  const { sid } = context.query;
  const res = await fetch(`https://swapi.co/api/starships/?search=${sid}`);
  const data = await res.json();
  const [ship] = data.results;

  console.log(`Fetched ship: ${ship.name}`);

  if (ship.pilots) {
    if (ship.pilots.length > 1) {
      const pilots = await Promise.all(
        ship.pilots.map(p => fetch(p).then(res => res.json()))
      );
      delete ship.pilots;
      ship.pilots = pilots.map(p => p.name);
    } else if (ship.pilots.length === 1) {
      const response = await fetch(ship.pilots[0]);
      const pilotInfo = await response.json();
      delete ship.pilots;
      ship.pilots = [pilotInfo.name];
    }
  }

  return { ship };
};

export default StarShipPost;
