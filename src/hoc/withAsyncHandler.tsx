import React, { useState, useCallback } from "react";

const withAsyncHandler = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const [loading, setLoading] = useState(false);

    const asyncHandler = useCallback(
      async (asyncFunc: (...args: any[]) => Promise<any>, ...args: any[]) => {
        try {
          setLoading(true);
          const result = await asyncFunc(...args);
          return result;
        } catch (err: any) {
          throw err;
        } finally {
          setLoading(false);
        }
      },
      []
    );

    return (
      <WrappedComponent
        loading={loading}
        {...props}
        asyncHandler={asyncHandler}
      />
    );
  };
};

export default withAsyncHandler;
