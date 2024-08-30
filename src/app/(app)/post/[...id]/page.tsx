import ArticleCardPost from "@/components/ArticleCardPost";

interface PostProps {
  params: {
    id: number[];
  };
}

// export function generateStaticParams() {
//   return [{ id: "1" }, { id: "2" }, { id: "3" }];
// }

export default function Post({ params }: PostProps) {
  return (
    <section className=" w-full h-full flex justify-center items-center flex-col">
      <ArticleCardPost
        id={params.id[0]}
        likes={params.id[1]}
        unlikes={params.id[2]}
        statusLike={params.id[3] as unknown as boolean}
        statusUnlike={params.id[4] as unknown as boolean}
      />
    </section>
  );
}
