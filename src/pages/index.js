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
        {props.starships.map(s => (
          <StarshipPostLink key={s} sid={s} name={s} />
        ))}
      </ul>
    </div>
  </Layout>
);

Index.getInitialProps = async () => {
  const res = await fetch('https://swapi.co/api/starships/');
  const data = await res.json();

  console.log(`${data.results.length} starships found!`);

  return {
    starships: data.results.map(d => d.name)
  };
};

export default Index;
