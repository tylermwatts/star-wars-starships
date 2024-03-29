import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';

const StarshipPostLink = props => (
  <li>
    <Link href={`/starships/[sid]`} as={`/starships/${props.sid}`}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>{props.name}</a>
    </Link>
  </li>
);

const Index = props => (
  <Layout>
    <div>
      <h1>Star Wars Starships</h1>
      <ul>
        {props.starships.map(ship => (
          <StarshipPostLink key={ship.id} sid={ship.id} name={ship.name} />
        ))}
      </ul>
    </div>
  </Layout>
);

Index.getInitialProps = async () => {
  const res = await fetch('https://swapi.co/api/starships/');
  const data = await res.json();
  const ships = data.results;

  const getShipId = str => {
    const id = [...str.match(/\d/g)].map(c => c[0]).join('');
    return id;
  };

  if (data.count > 10) {
    for (let c = 2; c <= Math.ceil(data.count / 10); c++) {
      await fetch(`https://swapi.co/api/starships/?page=${c}`)
        .then(res => res.json())
        .then(nextData => {
          ships.push(...nextData.results);
        });
    }
  }

  return {
    starships: ships
      .map(s => {
        return {
          name: s.name,
          id: getShipId(s.url)
        };
      })
      .sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase()
          ? -1
          : a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : 0
      )
  };
};

export default Index;
