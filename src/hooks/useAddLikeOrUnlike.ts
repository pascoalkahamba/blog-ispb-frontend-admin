import { useMutation, useQueryClient } from "@tanstack/react-query";

// interface UserMutationPostProps {
//   mutationFunction: (data: T) => Promise<K>;
// }

//  type a = Data["name"]
function set<T, K extends keyof T>(obj: T, prop: K, value: T[K]) {}

export function useAddLikeOrUnlike<T, K>(
  mutationFunction: (reaction: T) => Promise<K>,
  queryKey?: string
) {
  const queryClient = useQueryClient();
  const userId = JSON.parse(localStorage.getItem("userId") as string) as number;

  const mutation = useMutation({
    mutationFn: (reaction: T) => mutationFunction(reaction),
    onSuccess: () => queryClient.refetchQueries(),
  });

  return { mutation };
}
