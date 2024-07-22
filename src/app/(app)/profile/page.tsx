import { UserInfoProfile } from "@/components/UserInfoProfile";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Vitrine-ISPB | Fazer Login",
  description: "Page to user creates your account on the website.",
};

export default function Signin() {
  const cookiesStore = cookies();

  console.log(cookiesStore.get("validateCode"));
  return (
    <section className="w-full h-svh flex p-2 justify-center">
      <div className="w-[50%] mt-0">
        <UserInfoProfile />
      </div>
    </section>
  );
}
