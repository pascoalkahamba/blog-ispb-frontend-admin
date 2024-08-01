import { FileWithPath } from "@mantine/dropzone";
import { atom } from "jotai";
const dropzoneAtom = atom(false);
const selectFileAtom = atom<FileWithPath | string>("");

export { dropzoneAtom, selectFileAtom };
