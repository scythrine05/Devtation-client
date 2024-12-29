import { useCallback } from "react";
import withDataFetching from "/src/hoc/withDataFetching";
import Grid from "/src/components/Grid";
import { CardData } from "/src/types";
import { getProjects } from "/src/apis/custom";
import { useAuth } from "/src/hooks/useAuth";

const GridWithData = withDataFetching<CardData>(Grid);

const Cards = () => {
  const { user } = useAuth();

  const fetchData = useCallback(() => getProjects(), [user]);

  return <GridWithData fetchData={fetchData} />;
};

export default Cards;
