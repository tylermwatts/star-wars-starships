import React from 'react';
import Layout from '../../components/Layout';

const StarShipPost = props => (
  <Layout>
    <div>
      <h1>{props.ship.name}</h1>
      <ul>
        <li>Model: {props.ship.model}</li>
        <li>Manufacturer: {props.ship.manufacturer}</li>
        <li>Crew: {props.ship.crew}</li>
        <li>Passengers: {props.ship.passengers}</li>
        <li>Hyperdrive Rating: {props.ship.hyperdrive_rating}</li>
        <li>Starship Class: {props.ship.starship_class}</li>
        {props.ship.pilots.length > 0 && (
          <li>{`Pilot(s): ${props.ship.pilots.join(', ')}`}</li>
        )}
      </ul>
    </div>
  </Layout>
);

StarShipPost.getInitialProps = async context => {
  const { sid } = context.query;
  const res = await fetch(`https://swapi.co/api/starships/?search=${sid}`);
  const data = await res.json();

  console.log(`Fetched ship: ${data.results[0].name}`);

  return { ship: data.results[0] };
};

export default StarShipPost;
