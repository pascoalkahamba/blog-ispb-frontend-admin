import { appAxios } from "@/axios";
import { ICreatePost, ISignin } from "@/interfaces";

export async function createPost({ content, file, title }: ICreatePost) {
  const response = await appAxios.post<ICreatePost>(
    "/user",
    {
      title,
      content,
      file,
    },
    { withCredentials: true }
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
