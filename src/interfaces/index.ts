import { TWhoPosted } from "@/@types";

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

export interface ISignin {
  email: string;
  password: string;
  terms: boolean;
}

export interface ILoggedInfo {
  user: {
    id: number;
    email: string;
    contact: string;
    username: string;
  };
  token: string;
}
