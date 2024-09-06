import { TRole } from "@/@types";
import axios from "@/axios";
import {
  IAddLike,
  IAddUnlike,
  ICommentDataResult,
  ICourse,
  ICreateCommentData,
  ICreatedReplyData,
  ICreatePost,
  ICustomUpdateProfile,
  IDepartmentData,
  IGetOneUser,
  ILoginResponse,
  IPost,
  IReplyDataResult,
  ISignin,
  IUpdateUserProfile,
  IUser,
} from "@/interfaces";
import { showEspecialRoute } from "@/utils";

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

export async function getAllDepartments() {
  const response = await axios<IDepartmentData[]>(
    "/department/getAllDepartments"
  );
  const allDepartments = response.data;

  return allDepartments;
}
export async function getAllCoursesFromDepartment(id?: number) {
  const response = await axios<ICourse[]>(
    `/department/getAllCoursesFromDepartment/${id}`
  );
  const allCourses = response.data;

  return allCourses;
}
export async function getAllPostsFromDepartment(departmentId: number | null) {
  const response = await axios<IPost[]>(
    `/post/allPostsFromDepartment/${departmentId}`
  );
  const allPosts = response.data;

  return allPosts;
}

export async function deleteUser({ id, role }: IGetOneUser) {
  const whatRoute = showEspecialRoute(role);
  const response = await axios.delete<IUser>(`/${whatRoute}/deleteUser/${id}`);
  const deletedUser = response.data;

  return deletedUser;
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

export async function addLikePost({ id, like, statusLike }: IAddLike) {
  const response = await axios.post<IPost>(`/post/addLike/${id}`, {
    like,
    statusLike,
  });

  const postLiked = response.data;
  return postLiked;
}
export async function addLikeReply({ id, like, statusLike }: IAddLike) {
  const response = await axios.post<IReplyDataResult>(`/reply/addLike/${id}`, {
    like,
    statusLike,
  });

  const replyLiked = response.data;
  return replyLiked;
}

export async function addLikeComment({ id, like, statusLike }: IAddLike) {
  const response = await axios.post<ICommentDataResult>(
    `/comment/addLike/${id}`,
    {
      like,
      statusLike,
    }
  );

  const commentLiked = response.data;
  return commentLiked;
}
export async function addUnlikeComment({
  id,
  unlike,
  statusUnlike,
}: IAddUnlike) {
  const response = await axios.post<ICommentDataResult>(
    `/comment/addUnlike/${id}`,
    {
      unlike,
      statusUnlike,
    }
  );

  const commentUnliked = response.data;
  return commentUnliked;
}

export async function getOneUser({ id, role }: IGetOneUser) {
  const whatRoute = showEspecialRoute(role);
  const response = await axios<IUser>(`/${whatRoute}/getOneUser/${id}`);
  const user = response.data;

  return user;
}

export async function updateUserProfile({
  formdata,
  role,
  id,
}: ICustomUpdateProfile) {
  const whatRoute = showEspecialRoute(role);
  const response = await axios.post<IUser>(
    `/${whatRoute}/updateInfoProfile/${id}`,
    formdata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const updatedUser = response.data;

  return updatedUser;
}

export async function addUnlikeReply({ id, unlike, statusUnlike }: IAddUnlike) {
  const response = await axios.post<IReplyDataResult>(
    `/reply/addUnlike/${id}`,
    {
      unlike,
      statusUnlike,
    }
  );

  const replyUnliked = response.data;
  return replyUnliked;
}

export async function addUnlikePost({ id, unlike, statusUnlike }: IAddUnlike) {
  const response = await axios.post<IPost>(`/post/addUnlike/${id}`, {
    unlike,
    statusUnlike,
  });

  const postUnliked = response.data;
  return postUnliked;
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
  const response = await axios.post<ILoginResponse>(
    `/${whichRoute}/login`,
    {
      email,
      password,
    },
    { withCredentials: true }
  );

  const logged = response.data;

  return logged;
}

export async function getAllPost(departmentId: number | null) {
  const response = await axios.get<IPost[]>(`/post/allPosts/${departmentId}`);
  const allPosts = response.data;

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
