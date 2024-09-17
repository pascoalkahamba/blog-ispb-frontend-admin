"use client";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Select,
} from "@mantine/core";
import classes from "./styles.module.css";
import { zodResolver } from "mantine-form-zod-resolver";
import Link from "next/link";
import { useCreateAccount } from "@/hooks/useCreateAccount";
import {
  createAccount,
  getAllCoursesFromDepartment,
  getAllDepartments,
} from "@/server";
import { TCreateCoordinatorAccount } from "@/@types";
import { createCoordinatorSchema } from "@/schemas";
import useGetEverything from "@/hooks/useGetEverything";
import { useMemo } from "react";
import CustomButton from "@/components/CustomButton";
import useQueryPost from "@/hooks/useQueryPost";

export default function AuthCreateAccount(props: PaperProps) {
  const router = useRouter();
  const { data: departments } = useGetEverything(
    getAllDepartments,
    "allDepartments"
  );
  const { mutate, isPending } = useCreateAccount(
    createAccount,
    showNotificationOnSuccess,
    showNotificationOnError
  );

  function showNotificationOnSuccess() {
    notifications.show({
      title: "Criação de conta",
      message: "Sua conta foi criada com sucesso.",
      position: "top-right",
      color: "blue",
    });
    router.push("/signin");
    form.reset();
  }
  function showNotificationOnError() {
    notifications.show({
      title: "Criação de conta",
      message: "Algo deu errado verifique os dados e tente novamente.",
      position: "top-right",
      color: "red",
    });
  }

  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      firstPassword: "",
      secondPassword: "",
      courseId: 0,
      departmentId: 0,
      contact: "",
    },
    validate: zodResolver(createCoordinatorSchema),
  });

  const {
    query: { data: courses },
  } = useQueryPost(
    getAllCoursesFromDepartment,
    `getAllCourses${form.values.departmentId}`,
    form.values.departmentId
  );

  const allDepartments = useMemo(() => {
    return departments?.map(({ id, name }) => ({
      value: `${id}`,
      label: name,
    }));
  }, [departments]);

  const allCourses = useMemo(() => {
    return courses?.map(({ id, name }) => ({
      value: `${id}`,
      label: name,
    }));
  }, [courses]);

  async function handleSubmit(values: TCreateCoordinatorAccount) {
    const {
      contact,
      email,
      username,
      courseId,
      firstPassword,
      secondPassword,
      departmentId,
    } = values;

    if (firstPassword.trim() !== secondPassword.trim()) {
      notifications.show({
        title: "Criação de conta",
        message: "As senhas devem ser iguais.",
        position: "top-right",
        color: "red",
      });
      return;
    }
    console.log("values", values);
    mutate({
      contact,
      email,
      password: firstPassword,
      username,
      departmentId,
      courseId,
    });
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props} className=" w-[35%]">
      <Text size="lg" fw={500} className="text-center font-bold">
        Criar conta do cordenador
      </Text>

      <Divider label="Blog do ISPB" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Nome"
            required
            placeholder="Seu nome"
            value={form.values.username}
            onChange={(event) =>
              form.setFieldValue("username", event.currentTarget.value)
            }
            radius="md"
            error={form.errors.username}
          />

          <TextInput
            required
            label="Email"
            placeholder="pascoalkahamba25@gmail.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            radius="md"
            error={form.errors.email}
          />
          <div className="w-full flex items-center gap-2">
            <PasswordInput
              required
              label="Senha"
              placeholder="Sua senha"
              className="w-[50%]"
              value={form.values.firstPassword}
              onChange={(event) =>
                form.setFieldValue("firstPassword", event.currentTarget.value)
              }
              radius="md"
              error={form.errors.firstPassword}
            />

            <PasswordInput
              required
              label="Confirma a senha"
              placeholder="Sua senha"
              className="w-[50%]"
              value={form.values.secondPassword}
              onChange={(event) =>
                form.setFieldValue("secondPassword", event.currentTarget.value)
              }
              radius="md"
              error={form.errors.secondPassword}
            />
          </div>
          <TextInput
            required
            type="number"
            label="Número de telefone"
            placeholder="Seu numero de telefone"
            value={form.values.contact}
            onChange={(event) =>
              form.setFieldValue("contact", event.currentTarget.value)
            }
            radius="md"
            error={form.errors.contact}
          />

          <Select
            required
            label="Selecione seu departamento"
            placeholder="Escolha um departamento"
            value={`${form.values.departmentId}`}
            className="self-start w-full"
            onChange={(value) =>
              form.setFieldValue("departmentId", Number(value))
            }
            data={allDepartments}
            withAsterisk
            clearable
            error={form.errors.departmentId}
            searchable
          />
          <Select
            required
            label="Selecione seu curso"
            placeholder="Escolha um curso"
            value={`${form.values.courseId}`}
            className="self-start w-full"
            onChange={(value) => form.setFieldValue("courseId", Number(value))}
            data={allCourses}
            withAsterisk
            clearable
            error={form.errors.courseId}
            searchable
          />

          <Group justify="space-between" mt="xl">
            <Link href="/signin">
              <Anchor component="button" type="button" c="dimmed" size="xs">
                Já tenho uma conta? Entrar
              </Anchor>
            </Link>
            <CustomButton
              size="sm"
              radius="xl"
              type="submit"
              target="Cadastrar"
              targetPedding="Cadastrando"
              isPending={isPending}
            />
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
