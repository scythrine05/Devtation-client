import React from 'react';

import Layout from '/src/layouts/Layout';
import GetStarted from '/src/pages/GetStarted';

import { useAuth } from '/src/hooks/useAuth';

const Landing: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated() ? <Layout /> : <GetStarted />;
};

export default Landing;