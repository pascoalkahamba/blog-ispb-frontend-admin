import { signinSchemas } from "@/schemas";
import { FormEventHandler } from "react";
import { z as zod } from "zod";

export type HandleChangePostProps =
  | FormEventHandler<HTMLDivElement>
  | undefined;

export type TSigninProps = zod.infer<typeof signinSchemas>;
