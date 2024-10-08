"use client";

import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Divider,
  Checkbox,
  Stack,
} from "@mantine/core";
import Link from "next/link";
import { signinSchemas } from "@/schemas";
import { TSigninProps } from "@/@types";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { signin } from "@/server";
import { ISignin } from "@/interfaces";
import CustomButton from "@/components/CustomButton";

export default function AuthSignin(props: PaperProps) {
  const { data, isPending, mutate, error, status } = useMutation({
    mutationFn: (newUser: ISignin) => signin(newUser),
  });

  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      terms: true,
    },
    validate: zodResolver(signinSchemas),
  });

  const handleSubmit = async ({ email, password, terms }: TSigninProps) => {
    console.log("Clicked.");

    mutate({ email, password, terms });

    if (status === "success") {
      notifications.show({
        title: "Login autorizado.",
        message: "Login feito com succeso.",
        position: "top-right",
        color: "blue",
      });
      const whoCreator = terms ? "admin" : "coordinator";
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("whoCreator", JSON.stringify(whoCreator));

      localStorage.setItem("userId", JSON.stringify(data.user.id));
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      router.push("/dashboard");
      form.reset();
      return;
    }

    if (error) {
      notifications.show({
        color: "red",
        title: "Login não autorizado.",
        message: "Email não cadastrado ou senha incorreta.",
        position: "top-right",
      });
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");

      return;
    }
  };

  return (
    <Paper
      radius="md"
      p="xl"
      withBorder
      {...props}
      className=" w-[40%] flex flex-col justify-center gap-1"
    >
      <Text size="lg" fw={500} className="self-center mb-5">
        Bem-vindo a Vitrine online do ISPB
      </Text>

      <Text size="lg" fw={500} className="text-center font-bold">
        Fazer Login
      </Text>

      <Divider label="Vitrine do ISPB" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            required
            label="Email"
            type="email"
            placeholder="pascoalkahamba25@gmail.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
            radius="md"
          />

          <PasswordInput
            required
            label="Senha"
            placeholder="Sua senha"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password}
            radius="md"
          />
          <Link
            href="/forgotPassword"
            className=" mt-[-10px] text-blue-500 hover:underline"
          >
            <span className="text-xs talic">Esqueceu a senha</span>
          </Link>
        </Stack>

        <Group justify="space-between" mt="xl">
          <Checkbox
            label="Você é administrador"
            checked={form.values.terms}
            onChange={(event) =>
              form.setFieldValue("terms", event.currentTarget.checked)
            }
          />
          <CustomButton
            target="Entrar"
            targetPedding="Entrando"
            isPending={isPending}
            isDirty={form.isDirty("email") && form.isDirty("password")}
            isValid={false}
            size="sm"
            radius="lg"
            type="submit"
          />
        </Group>
      </form>
    </Paper>
  );
}
