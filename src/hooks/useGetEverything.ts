import { useQuery } from "@tanstack/react-query";

export default function useGetEverything<K>(
  queryFunction: (id?: number | null) => Promise<K>,
  queryKey: string,
  id?: number | null
) {
  // const userId = JSON.parse(localStorage.getItem("userId") as string) as number;
  const query = useQuery({
    queryKey: [queryKey],
    queryFn: () => queryFunction(id),
  });

  return { ...query };
}
