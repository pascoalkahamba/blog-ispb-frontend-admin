import FooterMain from "@/components/FooterMain";
import HeaderMain from "@/components/HeaderMain";
import { Metadata } from "next";

interface LayoutAppProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Vitrine-ISPB | Página inicial",
  description: "Page to user creates your account on the website.",
};

export default function LayoutApp({ children }: LayoutAppProps) {
  return (
    <section>
      <HeaderMain />
      <div className="pt-36">{children}</div>
      <FooterMain />
    </section>
  );
}
