import React from 'react';
import Layout from '../components/Layout';

const About = () => (
  <Layout>
    <div>
      <h1>About</h1>
      <p>
        This project was created by{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={'https://github.com/warpfox'}
        >
          Tyler Watts
        </a>{' '}
        to learn data fetching and dynamic routing with Next.js
      </p>
    </div>
  </Layout>
);

export default About;
