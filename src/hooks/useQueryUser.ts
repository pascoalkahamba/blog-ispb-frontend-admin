import { useQuery } from "@tanstack/react-query";

export default function useQueryUser<T, K>(
  queryFunction: (value: T) => Promise<K>,
  queryKey: string,
  value: T
) {
  const query = useQuery({
    queryKey: [queryKey],
    queryFn: () => queryFunction(value),
  });

  return { query };
}
