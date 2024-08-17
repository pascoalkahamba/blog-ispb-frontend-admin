"use client";

import React from "react";
import EspecificPost from "@/components/EspecificPost";
import { useQuery } from "@tanstack/react-query";
import { getAllPost } from "@/server";
import { IPost } from "@/interfaces";

export default function AllPosts() {
  const { data, isPending, error } = useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: getAllPost,
  });

  if (isPending) return "Loading...";

  console.log("AllPosts", data);
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex justify-center items-center w-full flex-wrap gap-2 px-12 py-4">
      {data.map(({ title }) => (
        <EspecificPost key={title} />
      ))}
    </div>
  );
}
