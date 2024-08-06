import ArticleCardPost from "@/components/ArticleCardPost";

interface PostProps {
  params: {
    id: number;
  };
}

// export function generateStaticParams() {
//   return [{ id: "1" }, { id: "2" }, { id: "3" }];
// }

export default function Post({ params }: PostProps) {
  return (
    <section className=" w-full h-full flex justify-center items-center flex-col">
      <ArticleCardPost id={params.id} />
    </section>
  );
}
