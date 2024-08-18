import { Skeleton } from "@mantine/core";

interface SkeletonComponentProps {
  isPending: boolean;
  skeletons: number[];
}
export default function SkeletonComponent({
  isPending,
  skeletons,
}: SkeletonComponentProps) {
  return (
    <section className="flex justify-center items-center w-full flex-wrap gap-2 px-12 py-4">
      {skeletons.map((skeleton, index) => (
        <Skeleton
          visible={isPending}
          key={index}
          height={300}
          width={200}
          className="flex-auto"
          radius="sm"
        />
      ))}
    </section>
  );
}
