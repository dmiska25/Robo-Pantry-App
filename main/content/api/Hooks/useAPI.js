// ./src/hooks.js
import { useQuery } from "react-query";
import * as Sentry from "sentry-expo";
import { getQueryClient } from "../../constants/queryClient";

export const useAPI = (
  apiFunction,
  params,
  { conditional = () => false, onSuccess = () => {}, onFailure = () => {} } = {}
) => {
  const queryClient = getQueryClient();

  const loadData = () => {
    return useQuery(
      [apiFunction.name, params],
      async () => {
        var data;
        await apiFunction(params)
          .then((res) => {
            data = res.data;
            onSuccess();
          })
          .catch((err) => {
            console.warn(err);
            Sentry.Native.captureException(err, {});
            onFailure(err);
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
