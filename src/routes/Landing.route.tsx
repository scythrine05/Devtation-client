import React from "react";
import Layout from "/src/layouts/Layout";
import GetStarted from "/src/pages/GetStarted";
import RouteAuthHandler from "/src/hoc/routeAuthHandler";

const Landing: React.FC = () => {
  return (
    <RouteAuthHandler fallbackComponent={<GetStarted />}>
      <Layout />
    </RouteAuthHandler>
  );
};

export default Landing;