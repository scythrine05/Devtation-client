import React, { useState, useEffect, ComponentType } from "react";
import LoadingComponent from "/src/components/Loading";
import ErrorComponent from "/src/components/Error";

interface WithDataFetchingProps<T> {
  fetchData: () => Promise<T[]>;
}

const withDataFetching = <T extends object>(
  WrappedComponent: ComponentType<{ data: T[] }>
) => {
  const DataFetchingComponent: React.FC<WithDataFetchingProps<T>> = ({
    fetchData,
  }) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchDataAsync = async () => {
        try {
          const response = await fetchData();
          setData(response);
          setLoading(false);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };

      fetchDataAsync();
    }, [fetchData]);

    if (loading) {
      return <LoadingComponent />;
    }

    if (error) {
      return <ErrorComponent error={error} />;
    }

    return <WrappedComponent data={data} />;
  };

  return DataFetchingComponent;
};

export default withDataFetching;
