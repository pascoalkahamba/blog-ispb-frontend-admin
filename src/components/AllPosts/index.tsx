"use client";
import EspecificPost from "@/components/EspecificPost";
import { getAllPost } from "@/server";
import SkeletonComponent from "@/components/Skeleton";
import useQueryPost from "@/hooks/useQueryPost";
import { useAtomValue } from "jotai";
import { departmentIdAtom } from "@/storage/atom";

export default function AllPosts() {
  const departmentId = useAtomValue(departmentIdAtom);
  const lastData = [1, 2, 3, 3, 2, 1, 2, 2, 1, 4, 3, 2, 4, 3, 2];
  const { query } = useQueryPost(getAllPost, "allPosts", departmentId);

  if (query.isPending)
    return (
      <SkeletonComponent
        isPending={query.isPending}
        skeletons={lastData}
        width={200}
        height={300}
      />
    );

  if (query.error)
    return <p>Algo deu errado tente novamente: </p> + query.error.message;

  if (query.data.length <= 0)
    return (
      <p className="p-3 font-bold">
        Nenhum post encontrado por favor crie um post.
      </p>
    );
  return (
    <div className="flex justify-center items-center w-full flex-wrap gap-2 px-12 py-4">
      {query.data.map(
        ({
          title,
          id,
          picture,
          content,
          createdAt,
          statusLike,
          statusUnlike,
          likes,
          admin,
          coordinator,
          unlikes,
        }) => (
          <EspecificPost
            id={id}
            key={id}
            title={title}
            statusLike={statusLike}
            statusUnlike={statusUnlike}
            content={content}
            picture={picture}
            coordinator={coordinator}
            admin={admin}
            likes={likes}
            unlikes={unlikes}
            createdAt={createdAt}
          />
        )
      )}
    </div>
  );
}
