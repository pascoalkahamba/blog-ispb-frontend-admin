import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useQueryPost<T>(
  queryFunction: (id?: number) => Promise<T[]>,
  queryKey: string,
  id?: number
) {
  const queryClient = useQueryClient();
  const userId = JSON.parse(localStorage.getItem("userId") as string) as number;
  const query = useQuery({
    queryKey: [queryKey, `${userId}`],
    queryFn: () => queryFunction(id),
  });

  if (query.isSuccess) queryClient.refetchQueries();
  return { query };
}
