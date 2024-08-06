import { z as zod } from "zod";

const postInfoSchema = zod.object({
  title: zod
    .string()
    .min(6, { message: "Titulo deve ter mais de seis caracteres" }),
  content: zod
    .string()
    .min(6, { message: "Descrição deve ter mais de seis caracteres" }),
  nameOfDepartament: zod
    .string()
    .min(6, {
      message: "nome do departamento deve ter mais de seis caracteres",
    }),
});

const signinSchemas = zod.object({
  email: zod.string().email({ message: "email invalido" }),
  password: zod
    .string()
    .min(6, { message: "Senha deve ter mais de 6 caracteres." }),
  terms: zod.boolean(),
});

export { postInfoSchema, signinSchemas };
