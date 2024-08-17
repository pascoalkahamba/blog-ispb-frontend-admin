import axios from "@/axios";
import { ILoginResponse, IPost, ISignin } from "@/interfaces";

export async function createPost(formData: FormData) {
  const response = await axios.post<FormData>(
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
  const response = await axios.post<ISignin>(
    `/${whichRoute}/login`,
    {
      email,
      password,
    },
    { withCredentials: true }
  );

  const logged: ILoginResponse = response.data as unknown as ILoginResponse;

  return logged;
}

export async function getAllPost() {
  const response = await axios.get("/post/allPosts");
  const allPosts = response.data as IPost[];

  return allPosts;
}
