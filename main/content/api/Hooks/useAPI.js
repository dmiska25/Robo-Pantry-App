// ./src/hooks.js
import { useQuery } from "react-query";
import * as Sentry from "sentry-expo";
import { getQueryClient } from "../../constants/queryClient";

export const useAPI = (
  apiFunction,
  params,
  { conditional = () => false } = {}
) => {
  const queryClient = getQueryClient();

  const loadData = () => {
    return useQuery(
      [apiFunction.name, params],
      async () => {
        const { data } = await apiFunction(params).catch((err) => {
          console.log(err);
          Sentry.captureException(err);
        });
        return data;
      },
      {
        enabled: !conditional(params),
      }
    );
  };

  const reloadData = () =>
    queryClient.invalidateQueries([apiFunction.name, params]);

  const { isLoading, data, error } = loadData();
  return [isLoading, data, error?.message, reloadData];
};
