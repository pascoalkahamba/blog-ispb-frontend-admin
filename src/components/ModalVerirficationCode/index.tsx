"use client";

import { TOperation, TVerificationCodeProps } from "@/@types";
import {
  Paper,
  Button,
  Stack,
  Modal,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { verificationCodeSchema } from "@/schemas";
import { useDisclosure } from "@mantine/hooks";
import { verifyCodeAndProceed } from "@/server";
import { useAtom, useSetAtom } from "jotai";
import {
  codeSentFromEmailAcceptAtom,
  showModalVerificationCodeAtom,
} from "@/storage/atom";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useVerifyCode } from "@/hooks/useVerifyCode";
import CustomButton from "@/components/CustomButton";

interface IModalVerificationCodeProps {
  email: string;
  operation: TOperation;
}

export default function ModalVerificationCode({
  email,
  operation,
}: IModalVerificationCodeProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [showThisModal, setShowThisModal] = useAtom(
    showModalVerificationCodeAtom
  );
  const setCodeSentFromEmail = useSetAtom(codeSentFromEmailAcceptAtom);
  const { mutate, isPending } = useVerifyCode(
    verifyCodeAndProceed,
    showNotificationOnSuccess,
    showNotificationOnError
  );

  useEffect(() => {
    if (showThisModal) open();
  }, [showThisModal]);

  const form = useForm({
    initialValues: {
      email,
      code: "",
    },
    validate: zodResolver(verificationCodeSchema),
  });

  function showNotificationOnSuccess() {
    notifications.show({
      title: "Validar o seu email.",
      message: "Código verificado com sucesso.",
      position: "top-right",
      color: "blue",
    });
    form.reset();
    setCodeSentFromEmail(true);
    setShowThisModal(false);
    close();
  }
  function showNotificationOnError() {
    notifications.show({
      title: "Validar o seu email.",
      message: "Código não verificado deve estar errado ou expirado.",
      position: "top-right",
      color: "red",
    });
  }

  function handleEditProfile(values: TVerificationCodeProps) {
    mutate({ email: values.email, code: values.code, operation });
  }

  function onCancelFn() {
    setShowThisModal(false);
    form.reset();
    close();
  }

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Confirmar o código enviado por email"
      size="md"
    >
      <form onSubmit={form.onSubmit(handleEditProfile)}>
        <Paper radius="md" p={20} withBorder className="flex flex-col gap-6">
          <TextInput
            required
            label="Novo email"
            placeholder={email}
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
            radius="md"
          />

          <TextInput
            required
            label="Código de confirmação"
            placeholder="Digite o código de confirmação"
            value={form.values.code}
            onChange={(event) =>
              form.setFieldValue("code", event.currentTarget.value)
            }
            error={form.errors.code}
            radius="md"
          />

          <div className="w-full p-1 flex justify-end items-center gap-3">
            <Button onClick={onCancelFn} variant="outline">
              Cancelar
            </Button>
            <CustomButton
              target="Enviar"
              targetPedding="Enviando"
              type="submit"
              isPending={isPending}
            />
          </div>
        </Paper>
      </form>
    </Modal>
  );
}
