// ./src/hooks.js
import { useState, useEffect } from "react";
import * as Sentry from "sentry-expo";

export const useAPI = (
  apiFunction,
  params,
  { conditional = () => false } = {}
) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = () => {
    setError(null);
    if (conditional && conditional(params)) return;
    setIsLoading(true);
    apiFunction(params)
      .then(({ data }) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Error: Failed to retrieve data from server!");
        setIsLoading(false);
        console.log(err);
        Sentry.captureException(err);
      });
  };
  const reloadData = () => {
    if (isLoading == true) return;
    loadData();
  };

  useEffect(() => {
    loadData();
  }, [apiFunction, params]);

  return [isLoading, data, error, reloadData];
};
