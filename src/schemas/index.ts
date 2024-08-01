import { z as zod } from "zod";

const postInfoSchema = zod.object({
  title: zod.string().min(6),
  description: zod.string().min(6),
});

const signinSchemas = zod.object({
  email: zod.string().email({ message: "email invalido" }),
  name: zod.string().min(6, { message: "Nome deve ter mais de 6 caracteres." }),
  password: zod
    .string()
    .min(6, { message: "Senha deve ter mais de 6 caracteres." }),
  terms: zod.boolean(),
});

export { postInfoSchema, signinSchemas };
