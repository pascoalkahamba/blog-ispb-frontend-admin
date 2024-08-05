import { appAxios } from "@/axios";
import { ISignin } from "@/interfaces";

export async function createPost(formData: FormData) {
  const response = await appAxios.post<FormData>(
    "/post/create",
    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  const posted = response.data;

  return posted;
}

export async function signin({ email, password }: ISignin) {
  const response = await appAxios.post<ISignin>(
    "/user/login",
    {
      email,
      password,
    },
    { withCredentials: true }
  );

  const logged = response.data;

  return logged;
}
