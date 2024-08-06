import { signinSchemas, postInfoSchema } from "@/schemas";
import { FormEventHandler } from "react";
import { z as zod } from "zod";

export type HandleChangePostProps =
  | FormEventHandler<HTMLDivElement>
  | undefined;

export type TSigninProps = zod.infer<typeof signinSchemas>;
export type TCreatePost = zod.infer<typeof postInfoSchema>;
export type TwhoPosted = "admin" | "coordinator";
export type TtypeInput = "title" | "departament";
