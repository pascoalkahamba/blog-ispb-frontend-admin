import axios from "@/axios";
import {
  ICommentDataResult,
  ICreateCommentData,
  ICreatedReplyData,
  ILoginResponse,
  IPost,
  IReplyDataResult,
  ISignin,
} from "@/interfaces";

export async function createPost(formData: FormData) {
  const response = await axios.post<IPost>(
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

export async function createComment({
  content,
  postId,
  whoCreator,
}: ICreateCommentData) {
  const response = await axios.post<ICommentDataResult>(
    `/comment/create/${postId}`,
    {
      content,
      whoCreator,
    }
  );

  const commentCreated = response.data;

  return commentCreated;
}
export async function createReply({
  content,
  commentId,
  whoCreator,
}: ICreatedReplyData) {
  const response = await axios.post<IReplyDataResult>(
    `/reply/create/${commentId}`,
    {
      content,
      whoCreator,
    }
  );

  const replyCreated = response.data;

  return replyCreated;
}

export async function deleteComment(id: number) {
  const response = await axios.delete<ICommentDataResult>(
    `/comment/delete/${id}`
  );
  const commentDeleted = response.data;

  return commentDeleted;
}

export async function deleteReply(id: number) {
  const response = await axios.delete<IReplyDataResult>(`/reply/delete/${id}`);
  const replyDeleted = response.data;

  return replyDeleted;
}

export async function editComment(content: string, id: number) {
  const response = await axios.post<ICommentDataResult>(
    `/comment/update/${id}`,
    {
      content,
    }
  );
  const commentUpdated = response.data;

  return commentUpdated;
}
export async function editReply(content: string, id: number) {
  const response = await axios.post<IReplyDataResult>(`/reply/update/${id}`, {
    content,
  });
  const replyUpdated = response.data;

  return replyUpdated;
}

export async function updatePost(formData: FormData, id: number) {
  const response = await axios.post<IPost>(
    `/post/update/${id}`,
    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  const postUpdated = response.data;

  return postUpdated;
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

export async function getOnePost(id: number) {
  const response = await axios.get(`/post/onePost/${id}`);
  const onePosts = response.data as IPost;

  return onePosts;
}

export async function deletePost(id: number) {
  const response = await axios.delete<IPost>(`/post/delete/${id}`);
  const postDeleted = response.data;

  return postDeleted;
}
