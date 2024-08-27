import { fetchDoneAtom, fetchErrorAtom } from "@/storage/atom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

// interface UserMutationPostProps {
//   mutationFunction: (data: T) => Promise<K>;
// }

//  type a = Data["name"]
function set<T, K extends keyof T>(obj: T, prop: K, value: T[K]) {}

export function useMutationPost<T, K>(
  mutationFunction: (value: T) => Promise<K>,
  queryKey?: string
) {
  const queryClient = useQueryClient();
  const userId = JSON.parse(localStorage.getItem("userId") as string) as number;

  const mutation = useMutation({
    mutationFn: (data: T) => mutationFunction(data),
    onSuccess: (data) => {
      queryClient.setQueryData<K[]>([queryKey, `${userId}`], (oldData = []) => [
        ...oldData,
        data,
      ]);
    },
  });

  return { mutation };
}
