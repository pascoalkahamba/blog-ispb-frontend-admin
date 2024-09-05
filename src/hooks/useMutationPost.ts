import { useMutation, useQueryClient } from "@tanstack/react-query";

// interface UserMutationPostProps {
//   mutationFunction: (data: T) => Promise<K>;
// }

//  type a = Data["name"]
function set<T, K extends keyof T>(obj: T, prop: K, value: T[K]) {}

export function useMutationPost<T, K>(
  mutationFunction: (value: T) => Promise<K>,
  notificationOnSuccess: () => void,
  notificationOnError: () => void,
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
      notificationOnSuccess();
    },
    onError: () => notificationOnError(),
  });

  return { mutation };
}
