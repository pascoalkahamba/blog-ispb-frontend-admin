import { signinSchemas, postInfoSchema } from "@/schemas";
import { FormEventHandler } from "react";
import { z as zod } from "zod";

export type HandleChangePostProps =
  | FormEventHandler<HTMLDivElement>
  | undefined;
export type TSigninProps = zod.infer<typeof signinSchemas>;
export type TCreatePost = zod.infer<typeof postInfoSchema>;
export type TWhoPosted = "admin" | "coordinator" | "student";
export type TTypeInput = "title" | "departament";
export type TRole = "USER" | "ADMIN" | "COORDINATOR";
export type TEventType = "comment" | "reply" | "nothing";
export type TModal =
  | "deletePost"
  | "deleteAccount"
  | "deleteComment"
  | "deleteReply";

export type TTypeButton = "button" | "submit" | "reset" | undefined;
