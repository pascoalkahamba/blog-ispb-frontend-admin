import { IPost } from "@/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// interface UserMutationPostProps {
//   mutationFunction: (data: T) => Promise<K>;
// }

//  type a = Data["name"]
function set<T, K extends keyof T>(obj: T, prop: K, value: T[K]) {}

export function useDeletePost<T>(
  mutationFunction: (value: T) => Promise<IPost>,
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
      queryClient.refetchQueries();
    },
  });

  return { mutation };
}
