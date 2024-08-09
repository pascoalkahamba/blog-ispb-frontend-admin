import { appAxios } from "@/axios";
import { ILoggedInfo, ISignin } from "@/interfaces";

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

export async function signin({ email, password, terms }: ISignin) {
  const whichRoute = terms ? "admin" : "coordinator";
  const response = await appAxios.post<ISignin>(
    `/${whichRoute}/login`,
    {
      email,
      password,
    },
    { withCredentials: true }
  );

  const logged: ILoggedInfo = response.data as unknown as ILoggedInfo;

  return logged;
}
