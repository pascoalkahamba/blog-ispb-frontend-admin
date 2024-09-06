import { TWhoPosted } from "@/@types";
import { IEdit } from "@/interfaces";
import { FileWithPath } from "@mantine/dropzone";
import { atom } from "jotai";
const dropzoneAtom = atom(false);
const editAtom = atom<IEdit>({ type: "nothing", status: false });
const titleAtom = atom("");
const commentAtom = atom({ id: 0, content: "" });
const replyAtom = atom({ id: 0, content: "" });
const contentAtom = atom("");
const departmentIdAtom = atom<number | null>(null);
const departmentSelectIdAtom = atom<number | null>(null);
const fetchErrorAtom = atom(false);
const fetchDoneAtom = atom(false);
const errorAtom = atom(false);
const whoCreatorAtom = atom<TWhoPosted>("admin");
const selectFileAtom = atom<FileWithPath | string>("");

export {
  dropzoneAtom,
  selectFileAtom,
  errorAtom,
  whoCreatorAtom,
  titleAtom,
  contentAtom,
  editAtom,
  departmentIdAtom,
  commentAtom,
  fetchDoneAtom,
  fetchErrorAtom,
  replyAtom,
  departmentSelectIdAtom,
};
