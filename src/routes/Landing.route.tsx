import React from "react";

import Layout from "/src/layouts/Layout";
import GetStarted from "/src/pages/GetStarted";

import { useAuth } from "/src/hooks/useAuth";

const Landing: React.FC = () => {
  const { user, loading } = useAuth();
  return loading ? "loading" :  user ? <Layout /> : <GetStarted />;
};

export default Landing;
