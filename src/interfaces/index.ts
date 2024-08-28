import { Session } from "next-auth";
import { TEventType, TRole, TWhoPosted } from "@/@types";

export interface ICreatePost {
  title: string;
  nameOfDepartment: string;
}

export interface IFile {
  path: string;
  lastModified: number;
  lastModifiedDate: Object;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface ICommentDataResult {
  id: number;
  createdAt: Date;
  likes: number;
  unlikes: number;
  updatedAt: Date;
  content: string;
  replies: IReply[];
  postId: number;
  admin: IUser | null;
  coordinator: IUser | null;
  student: IUser | null;
  adminId: number | null;
  studentId: number | null;
  coordinatorId: number | null;
}

// export interface ICustomSession extends Session {
//   accessToken: string;
//   user: IUser;
// }

export interface ISignin {
  email: string;
  password: string;
  terms: boolean;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}

export interface IEspecialInfoAdminOrCoordinator {
  username: string;
  role: TRole;
  profile: IProfile;
}

export interface IDepartment {
  id: number;
  name: string;
}

export interface IProfile {
  id: number;
  bio: string;
  photo: IPicture;
  studentId: number | null;
  adminId: number | null;
  coordinatorId: number | null;
}

export interface IPicture {
  id: number;
  name: string;
  url: string;
  adminId: null | number;
  coordinatorId: null | number;
  postId: number;
  studentId: null | number;
}
export interface IPost {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  department: IDepartment;
  comments: ICommentDataResult[];
  picture: IPicture;
  views: number;
  likes: number;
  admin: IEspecialInfoAdminOrCoordinator | null;
  coordinator: IEspecialInfoAdminOrCoordinator | null;
  unlikes: number | null;
  favorite: boolean | null;
  adminId: number | null;
  coordinatorId: number | null;
}

export interface ISimpleUser {
  username: string;
  photoUrl: string;
}

export interface IEdit {
  type: TEventType;
  status: boolean;
}

export interface IReply {
  id: number;
  createdAt: Date;
  likes: number;
  unlikes: number;
  updatedAt: Date;
  content: string;
  admin: IUser | null;
  coordinator: IUser | null;
  student: IUser | null;
  adminId: number | null;
  studentId: number | null;
  coordinatorId: number | null;
}
export interface ICreateCommentData {
  content: string;
  postId: number;
  whoCreator: TWhoPosted;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  profile: IProfile;
  role: string;
  registrationNumber: string | null;
  contact: string;
}
