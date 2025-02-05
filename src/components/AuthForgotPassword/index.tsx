"use client";
import {
  Paper,
  Title,
  Text,
  TextInput,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
  Stack,
  PasswordInput,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "./styles.module.css";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { forgotPasswordSchema } from "@/schemas";
import { zodResolver } from "mantine-form-zod-resolver";
import { TForgotPassword } from "@/@types";
import { useVerifyCode } from "@/hooks/useVerifyCode";
import { forgotPassword, requestVerificationCode } from "@/server";
import { notifications } from "@mantine/notifications";
import CustomButton from "@/components/CustomButton";
import { useAtom, useAtomValue } from "jotai";
import {
  codeSentFromEmailAcceptAtom,
  showModalVerificationCodeAtom,
  whoCreatorAtom,
} from "@/storage/atom";
import ModalVerificationCode from "@/components/ModalVerirficationCode";
import { useRouter } from "next/navigation";

export function AuthForgotPassword() {
  const [showModalVerificationCode, setShowModalVerificationCode] = useAtom(
    showModalVerificationCodeAtom
  );
  const [codeSentFromEmailAccept, setCodeSentFromEmailAccept] = useAtom(
    codeSentFromEmailAcceptAtom
  );
  const { mutate, isPending } = useVerifyCode(
    requestVerificationCode,
    showNotificationOnSuccess,
    showNotificationOnError
  );

  const whoCreator = useAtomValue(whoCreatorAtom);
  const router = useRouter();

  const { mutate: mutateUpdatePassword, isPending: isPendingUpdatePassword } =
    useVerifyCode(
      forgotPassword,
      showNotificationOnSuccessUpdatePassword,
      showNotificationOnErrorUpdatePassword
    );
  const form = useForm({
    initialValues: {
      email: "",
      password: undefined,
    },
    validate: zodResolver(forgotPasswordSchema),
  });

  function handleSubmit(values: TForgotPassword) {
    console.log("values", values);

    if (codeSentFromEmailAccept) {
      mutateUpdatePassword({
        email: values.email,
        password: values.password as string,
        whoUser: whoCreator,
      });

      return;
    }
    mutate({ email: values.email, operation: "resetPassword" });
  }

  function showNotificationOnSuccess() {
    notifications.show({
      title: "Recuperação de senha.",
      message: "Enviamos o código de verificação no seu email.",
      position: "top-right",
      color: "blue",
    });
    setShowModalVerificationCode(true);
  }
  function showNotificationOnError() {
    notifications.show({
      title: "Recuperação de senha.",
      message: "Algo deu errado verifique o seu email e tente novamente.",
      position: "top-right",
      color: "red",
    });
  }
  function showNotificationOnSuccessUpdatePassword() {
    notifications.show({
      title: "Atualização de senha.",
      message: "Sua senha foi alterada com sucesso.",
      position: "top-right",
      color: "blue",
    });
    setCodeSentFromEmailAccept(false);
    setShowModalVerificationCode(false);

    form.reset();
    router.push("/signin");
  }
  function showNotificationOnErrorUpdatePassword() {
    notifications.show({
      title: "Atualização de senha.",
      message: "Algo deu errado verifique os dados e tente novamente.",
      position: "top-right",
      color: "red",
    });
  }

  return (
    <Container
      size={460}
      my={30}
      component="section"
      className="flex justify-center flex-col w-[60%]"
    >
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl" className="w-66">
        <Title className={classes.title} ta="center">
          Esqueceu sua senha?
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Digite seu email para recuperar sua conta
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)} className="w-full">
          <Stack>
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
            {codeSentFromEmailAccept && (
              <PasswordInput
                required
                label="Nova senha"
                placeholder="Digite sua nova senha"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                radius="md"
                error={form.errors.password}
              />
            )}{" "}
            <Group justify="space-between" mt="lg" className={classes.controls}>
              <Anchor c="dimmed" size="sm" className={classes.control}>
                <Center inline>
                  <IconArrowLeft
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                  <Link href="/signin">
                    <Box ml={5} className=" text-xs italic hover:underline">
                      {" "}
                      Voltar para página de login
                    </Box>
                  </Link>
                </Center>
              </Anchor>
              <CustomButton
                type="submit"
                target="Recupera sua senha"
                targetPedding="Recuperando"
                isPending={
                  codeSentFromEmailAccept ? isPendingUpdatePassword : isPending
                }
              />
            </Group>
          </Stack>
        </form>
        {showModalVerificationCode && (
          <ModalVerificationCode
            email={form.values.email}
            operation="resetPassword"
          />
        )}
      </Paper>
    </Container>
  );
}
