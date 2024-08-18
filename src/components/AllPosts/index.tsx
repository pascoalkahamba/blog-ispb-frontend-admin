"use client";

import React from "react";
import EspecificPost from "@/components/EspecificPost";
import { useQuery } from "@tanstack/react-query";
import { getAllPost } from "@/server";
import { IPost } from "@/interfaces";
import SkeletonComponent from "../Skeleton";

export default function AllPosts() {
  const lastData = [1, 2, 3, 3, 2, 1, 2, 2, 1, 4, 3, 2, 4, 3, 2, 11];
  const { data, isPending, error } = useQuery<IPost[]>({
    queryKey: ["allPosts"],
    queryFn: getAllPost,
  });

  if (isPending)
    return <SkeletonComponent isPending={isPending} skeletons={lastData} />;

  console.log("allPosts", data);
  if (error) return <p>Algo deu errado tente novamente: </p> + error.message;

  if (data.length <= 0)
    return <p>Nenhum post encontrado por favor crie um post.</p>;
  return (
    <div className="flex justify-center items-center w-full flex-wrap gap-2 px-12 py-4">
      {data.map(
        ({
          title,
          id,
          picture,
          content,
          createdAt,
          likes,
          admin,
          coordinator,
          unlikes,
        }) => (
          <EspecificPost
            id={id}
            key={id}
            title={title}
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
