import { QueryClient } from "react-query";

const queryClient = new QueryClient();

export const getQueryClient = () => queryClient;
