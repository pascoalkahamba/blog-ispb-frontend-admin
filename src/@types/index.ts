import { signinSchemas, postInfoSchema } from "@/schemas";
import { FormEventHandler } from "react";
import { z as zod } from "zod";

export type HandleChangePostProps =
  | FormEventHandler<HTMLDivElement>
  | undefined;

export type TSigninProps = zod.infer<typeof signinSchemas>;
export type TCreatePost = zod.infer<typeof postInfoSchema>;
export type TWhoPosted = "admin" | "coordinator";
export type TTypeInput = "title" | "departament";
export type TRole = "USER" | "ADMIN" | "COORDINATOR";

export type TTypeButton = "button" | "submit" | "reset" | undefined;
