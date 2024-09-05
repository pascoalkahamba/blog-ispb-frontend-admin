import { IPost } from "@/interfaces";
import { fetchDoneAtom, fetchErrorAtom } from "@/storage/atom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

// interface UserMutationPostProps {
//   mutationFunction: (data: T) => Promise<K>;
// }

//  type a = Data["name"]
function set<T, K extends keyof T>(obj: T, prop: K, value: T[K]) {}

export function useDeletePost<T>(
  mutationFunction: (value: T) => Promise<IPost>,
  notificationOnSuccess: () => void,
  notificationOnError: () => void,
  queryKey?: string
) {
  const queryClient = useQueryClient();
  const userId = JSON.parse(localStorage.getItem("userId") as string) as number;
  const mutation = useMutation({
    mutationFn: (postId: T) => mutationFunction(postId),
    onSuccess: (deletedPost) => {
      queryClient.setQueryData<IPost[]>(
        [queryKey, `${userId}`],
        (oldData = []) => oldData.filter((post) => post.id !== deletedPost.id)
      );
      notificationOnSuccess();
      queryClient.refetchQueries();
    },
    onError: () => notificationOnError(),
  });

  return { mutation };
}
