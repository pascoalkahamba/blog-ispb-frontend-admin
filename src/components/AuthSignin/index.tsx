"use client";

import { useToggle } from "@mantine/hooks";
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
  Button,
  Divider,
  Checkbox,
  Stack,
} from "@mantine/core";
import Link from "next/link";
import { signinSchemas } from "@/schemas";
import { TSigninProps } from "@/@types";

export default function AuthSignin(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"]);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },
    validate: zodResolver(signinSchemas),
  });

  const handleSubmit = (values: TSigninProps) => {
    console.log("Everything is good.", values);
    router.push("/dashboard");
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

          <Button type="submit" radius="lg" size="sm">
            Entrar
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
