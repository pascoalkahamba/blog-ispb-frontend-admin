import { IPost } from "@/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// interface UserMutationPostProps {
//   mutationFunction: (data: T) => Promise<K>;
// }

//  type a = Data["name"]
function set<T, K extends keyof T>(obj: T, prop: K, value: T[K]) {}

export function useUpdatePost<T>(
  mutationFunction: (value: T, id: number) => Promise<IPost>,
  id: number,
  queryKey?: string
) {
  const queryClient = useQueryClient();
  const userId = JSON.parse(localStorage.getItem("userId") as string) as number;

  const mutation = useMutation({
    mutationFn: (postId: T) => mutationFunction(postId, id),
    onSuccess: () => queryClient.refetchQueries(),
  });

  return { mutation };
}
