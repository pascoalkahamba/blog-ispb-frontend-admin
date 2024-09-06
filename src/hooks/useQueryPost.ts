import { useQuery } from "@tanstack/react-query";

export default function useQueryPost<T>(
  queryFunction: (id: number | null) => Promise<T[]>,
  queryKey: string,
  id: number | null
) {
  const query = useQuery({
    queryKey: [queryKey, id],
    queryFn: () => queryFunction(id),
    staleTime: 5000,
  });

  return { query };
}
