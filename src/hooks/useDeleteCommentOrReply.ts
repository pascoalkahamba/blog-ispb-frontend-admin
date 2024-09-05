import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// interface UserMutationPostProps {
//   mutationFunction: (data: T) => Promise<K>;
// }

//  type a = Data["name"]
function set<T, K extends keyof T>(obj: T, prop: K, value: T[K]) {}

export function useDeleteCommentOrReply<T, K>(
  mutationFunction: (value: T) => Promise<K>,
  notificationOnSuccess: () => void,
  notificationOnError: () => void,
  queryKey?: string
) {
  const queryClient = useQueryClient();
  const route = useRouter();
  // const userId = JSON.parse(localStorage.getItem("userId") as string) as number;

  const mutation = useMutation({
    mutationFn: (id: T) => mutationFunction(id),
    onSuccess: () => {
      notificationOnSuccess();
      if (queryKey) {
        route.replace("/signin");
      }
      queryClient.refetchQueries();
    },
    onError: () => notificationOnError(),
  });

  return { mutation };
}
