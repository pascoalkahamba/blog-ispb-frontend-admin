import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useQueryUser<T, K>(
  queryFunction: (value: T) => Promise<K>,
  queryKey: string,
  value: T
) {
  const queryClient = useQueryClient();
  const userId = JSON.parse(localStorage.getItem("userId") as string) as number;
  const query = useQuery({
    queryKey: [queryKey, `${userId}`],
    queryFn: () => queryFunction(value),
  });

  if (query.isSuccess) queryClient.refetchQueries();
  return { query };
}
