import { AuthFooter } from "@/components/AuthFooter";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section>
      {children}
      <AuthFooter />
    </section>
  );
}
