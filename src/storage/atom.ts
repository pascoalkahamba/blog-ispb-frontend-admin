import { TWhoPosted } from "@/@types";
import { FileWithPath } from "@mantine/dropzone";
import { atom } from "jotai";
const dropzoneAtom = atom(false);
const errorAtom = atom(false);
const whoCreatorAtom = atom<TWhoPosted>("admin");
const selectFileAtom = atom<FileWithPath | string>("");

export { dropzoneAtom, selectFileAtom, errorAtom, whoCreatorAtom };
