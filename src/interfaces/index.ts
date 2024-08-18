import { Session } from "next-auth";
import { TRole, TWhoPosted } from "@/@types";

export interface ICreatePost {
  title: string;
  content: string;
  file: IFile;
  whoPosted: TWhoPosted;
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

export interface ICustomSession extends Session {
  accessToken: string;
  user: IUser;
}

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
  bio: string;
  photo: IPicture;
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
  departments: IDepartment[];
  picture: IPicture;
  views: number | null;
  likes: number | null;
  admin: IEspecialInfoAdminOrCoordinator | null;
  coordinator: IEspecialInfoAdminOrCoordinator | null;
  unlikes: number | null;
  favorite: boolean | null;
  adminId: number | null;
  coordinatorId: number | null;
}

export interface IUser {
  id: string;
  email: string;
  contact: string;
  username: string;
}
