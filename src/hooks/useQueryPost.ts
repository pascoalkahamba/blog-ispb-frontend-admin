import { useQuery } from "@tanstack/react-query";

export default function useQueryPost<T>(
  queryFunction: () => Promise<T[]>,
  queryKey: string
) {
  const userId = JSON.parse(localStorage.getItem("userId") as string) as number;
  const query = useQuery({
    queryKey: [queryKey, `${userId}`],
    queryFn: queryFunction,
  });
  return { query };
}
