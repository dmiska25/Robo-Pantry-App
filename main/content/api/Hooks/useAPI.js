// ./src/hooks.js
import { useQuery } from "react-query";
import * as Sentry from "sentry-expo";
import { getQueryClient } from "../../constants/queryClient";

// export const useAPI = (
//   apiFunction,
//   params,
//   { conditional = () => false } = {}
// ) => {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const loadData = () => {
//     setError(null);
//     if (conditional && conditional(params)) return;
//     setIsLoading(true);
//     apiFunction(params)
//       .then(({ data }) => {
//         setData(data);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         setError("Error: Failed to retrieve data from server!");
//         setIsLoading(false);
//         console.log(err);
//         Sentry.captureException(err);
//       });
//   };
//   const reloadData = () => {
//     if (isLoading == true) return;
//     loadData();
//   };

//   useEffect(() => {
//     loadData();
//   }, [apiFunction, params]);

//   return [isLoading, data, error, reloadData];
// };

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
