"use client";
import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  useMantineTheme,
  rem,
  TextInput,
  Group,
} from "@mantine/core";
import { IconPencilMinus } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import SimpleRichText from "../SimpleRichText";
import { zodResolver } from "mantine-form-zod-resolver";
import { postInfoEditSchema } from "@/schemas";
import { ICreatePost, IPost } from "@/interfaces";
import { useAtomValue } from "jotai";
import { contentAtom, selectFileAtom } from "@/storage/atom";
import { useMutation } from "@tanstack/react-query";
import { updatePost } from "@/server";
import { useUpdatePost } from "@/hooks/useUpdatePost";
import { notifications } from "@mantine/notifications";
import { TWhoPosted } from "@/@types";
import { ButtonProgress } from "../ButtonProcess";

interface ModalEditPostProps {
  title: string;
  content: string;
  id: number;
  file: string;
  nameOfDepartment: string;
}

export default function ModalEditPost({
  content,
  nameOfDepartment,
  title,
  id,
}: ModalEditPostProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const currentContent = useAtomValue(contentAtom);
  const currentFile = useAtomValue(selectFileAtom);
  const { mutation } = useUpdatePost(updatePost, id, "postUpdated");
  const whoCreator = JSON.parse(
    localStorage.getItem("whoCreator") as string
  ) as TWhoPosted;

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title,
      nameOfDepartment,
    },
    validate: zodResolver(postInfoEditSchema),
  });

  const formData = new FormData();

  function handleSubmit(value: ICreatePost) {
    if (currentContent.trim().length < 20) {
      notifications.show({
        title: "Conteúdo invalido",
        message: "Escreva um conteúdo com mais de 20 caracteres.",
        position: "top-right",
        color: "red",
      });
      return;
    }

    formData.append("title", value.title);
    formData.append("content", currentContent);
    formData.append("nameOfDepartment", value.nameOfDepartment);
    formData.append("whoPosted", whoCreator);
    formData.append("file", currentFile);

    console.log("formdata", formData);

    mutation.mutate(formData);

    if (mutation.isSuccess) {
      notifications.show({
        title: "Edição do post",
        message: "Post editado com sucesso.",
        position: "top-right",
        color: "blue",
      });
      console.log("post updated", mutation.data);
      return;
    }

    if (mutation.error) {
      notifications.show({
        title: "Edição do post",
        message: "Post não editado.",
        position: "top-right",
        color: "red",
      });
      return;
    }
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Editar Post"
        centered
        size="xl"
      >
        <form
          className=" w-full flex flex-col gap-3 p-2 justify-center"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <TextInput
            withAsterisk
            label="Titulo"
            placeholder="Escreva novo titulo"
            key={form.key("title")}
            error={form.errors.title}
            {...form.getInputProps("title")}
          />
          <TextInput
            withAsterisk
            label="Nome do departamento"
            placeholder="Escreva novo nome do departamento"
            key={form.key("nameOfDepartment")}
            error={form.errors.nameOfDepartment}
            {...form.getInputProps("nameOfDepartment")}
          />
          <div className="self-center">
            <ButtonProgress targetButton="Carregar uma nova imagem" />
          </div>
          <label>Contúdo</label>
          <SimpleRichText defaultContent={content} />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Editar</Button>
            <Button onClick={close}>Cancelar</Button>
          </Group>
        </form>
      </Modal>

      <IconPencilMinus
        onClick={open}
        style={{ width: rem(20), height: rem(20) }}
        color={theme.colors.yellow[6]}
        stroke={1.5}
      />
    </>
  );
}
