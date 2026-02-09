import DashboardChild from "@/components/DashboardChild";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vitrine-ISPB | Página inicial",
  description: "Page to user creates your account on the website.",
};

export default function Dashboard() {
  return (
    <section className="w-full">
      <DashboardChild />
    </section>
  );
}
