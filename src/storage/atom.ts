import { TWhoPosted } from "@/@types";
import { FileWithPath } from "@mantine/dropzone";
import { atom } from "jotai";
const dropzoneAtom = atom(false);
const titleAtom = atom("");
const contentAtom = atom("");
const nameOfDepartamentAtom = atom("");
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
  nameOfDepartamentAtom,
};
