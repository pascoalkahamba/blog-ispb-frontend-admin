import DashboardChild from "@/components/DashboardChild";
import { Metadata } from "next";
import { cookies } from "next/headers";

interface ProfileProps {
  params: {
    id: number;
  };
}

export const metadata: Metadata = {
  title: "Vitrine-ISPB | Página inicial",
  description: "Page to user creates your account on the website.",
};

export default function Dashboard({ params }: ProfileProps) {
  const cookiesStore = cookies();

  console.log(cookiesStore.get("validateCode"));
  return (
    <section className="w-full">
      <DashboardChild />
    </section>
  );
}
