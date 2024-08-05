import { TwhoPosted } from "@/@types";

export interface ICreatePost {
  title: string;
  content: string;
  file: IFile;
  whoPosted: TwhoPosted;
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
}
