import { TRole } from "@/@types";
import { UserInfoProfile } from "@/components/UserInfoProfile";
import { Metadata } from "next";
import { cookies } from "next/headers";

interface ProfileProps {
  params: {
    id: number[];
  };
}

export const metadata: Metadata = {
  title: "Vitrine-ISPB | Fazer Login",
  description: "Page to user creates your account on the website.",
};

export default function Profile({ params }: ProfileProps) {
  const cookiesStore = cookies();

  console.log(cookiesStore.get("validateCode"));
  return (
    <section className="w-full h-svh flex p-2 justify-center">
      <div className="w-[50%] mt-0">
        <UserInfoProfile
          id={params.id[0]}
          role={params.id[1] as unknown as TRole}
        />
      </div>
    </section>
  );
}
