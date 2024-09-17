import { z as zod } from "zod";

const postInfoSchema = zod.object({
  title: zod
    .string()
    .min(6, { message: "Titulo deve ter mais de seis caracteres" }),
  content: zod
    .string()
    .min(6, { message: "Descrição deve ter mais de seis caracteres" }),
  nameOfDepartament: zod.string().min(6, {
    message: "nome do departamento deve ter mais de seis caracteres",
  }),
});
const postInfoEditSchema = zod.object({
  title: zod
    .string()
    .min(6, { message: "Titulo deve ter mais de seis caracteres" }),
  departmentId: zod.string().min(1, {
    message: "Escolha um departamento antes de editar.",
  }),
});

const createCoordinatorSchema = zod.object({
  email: zod.string().email({ message: "email invalido" }),
  firstPassword: zod
    .string()
    .min(6, { message: "Senha deve ter mais de 6 caracteres." }),
  secondPassword: zod
    .string()
    .min(6, { message: "Senha deve ter mais de 6 caracteres." }),
  username: zod
    .string()
    .min(6, { message: "Nome deve ter mais de 6 caracteres." }),
  contact: zod
    .string()
    .min(9, { message: "Número deve ter no minimo 9 digitos." })
    .max(9, { message: "Número deve ter no maximo 9 digitos." }),
  courseId: zod.number(),
  departmentId: zod.number(),
});

const forgetPasswordSchema = zod.object({
  email: zod.string().email({ message: "Email invalido" }),
});

const signinSchemas = zod.object({
  email: zod.string().email({ message: "Email invalido" }),
  password: zod
    .string()
    .min(6, { message: "Senha deve ter mais de 6 caracteres." }),
  terms: zod.boolean(),
});
const signinSchema = zod.object({
  email: zod.string().email({ message: "email invalido" }),
  password: zod
    .string()
    .min(6, { message: "Senha deve ter mais de 6 caracteres." }),
});

const updateProfileSchema = zod.object({
  email: zod.string().email({ message: "Email invalido" }),
  departmentId: zod
    .number({
      message: "Este campo é obrigatorio e deve ser um número valido.",
    })
    .optional(),
  courseId: zod
    .number({
      message: "Este campo é obrigatorio e deve ser um número valido.",
    })
    .optional(),
  contact: zod
    .string()
    .min(9, { message: "Número deve ter no minimo 9 digitos." })
    .max(9, { message: "Número deve ter no maximo 9 digitos." }),
  username: zod
    .string()
    .min(6, { message: "Nome deve ter mais de seis caracteres." }),
  bio: zod
    .string()
    .min(12, { message: "Biografia deve ter mais de dozes caracteres." }),
  password: zod
    .string()
    .min(6, { message: "Senha deve ter mais de 6 caracteres." }),
});

export {
  postInfoSchema,
  signinSchemas,
  signinSchema,
  forgetPasswordSchema,
  createCoordinatorSchema,
  postInfoEditSchema,
  updateProfileSchema,
};
