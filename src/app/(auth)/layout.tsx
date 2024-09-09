import { AuthFooter } from "@/components/AuthFooter";
import { Metadata } from "next";
import { Inter } from "next/font/google";

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
