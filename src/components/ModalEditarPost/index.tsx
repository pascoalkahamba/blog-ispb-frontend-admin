"use client";
import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  useMantineTheme,
  rem,
  TextInput,
  Group,
  Select,
} from "@mantine/core";
import { IconPencilMinus } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import SimpleRichText from "../SimpleRichText";
import { zodResolver } from "mantine-form-zod-resolver";
import { postInfoEditSchema } from "@/schemas";
import { ICreatePost } from "@/interfaces";
import { useAtom, useSetAtom } from "jotai";
import {
  contentAtom,
  errorAtom,
  departmentIdAtom,
  selectFileAtom,
} from "@/storage/atom";
import { getAllDepartments, updatePost } from "@/server";
import { useUpdatePost } from "@/hooks/useUpdatePost";
import { notifications } from "@mantine/notifications";
import { TWhoPosted } from "@/@types";
import { ButtonProgress } from "../ButtonProcess";
import useQueryPost from "@/hooks/useQueryPost";

interface ModalEditPostProps {
  title: string;
  content: string;
  id: number;
  file: string;
  departmentId: number | null;
}

export default function ModalEditPost({
  content,
  departmentId,
  title,
  id,
}: ModalEditPostProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [currentContent, setCurrentContent] = useAtom(contentAtom);
  const [currentFile, setCurrentFile] = useAtom(selectFileAtom);
  const setDepartmentId = useSetAtom(departmentIdAtom);
  const setCurrentTitle = useSetAtom(selectFileAtom);
  const {
    query: { data },
  } = useQueryPost(getAllDepartments, "allDepartments");
  const setError = useSetAtom(errorAtom);
  const { mutation } = useUpdatePost(updatePost, id, "postUpdated");
  const whoCreator = JSON.parse(
    localStorage.getItem("whoCreator") as string
  ) as TWhoPosted;

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title,
      departmentId,
    },
    validate: zodResolver(postInfoEditSchema),
  });

  const formData = new FormData();

  function onCancelEdit() {
    close();
    cancelPost();
  }

  function cancelPost() {
    setCurrentContent("");
    setCurrentTitle("");
    setDepartmentId(null);
    setError(false);
    setCurrentFile("");
  }

  function handleSubmit(value: ICreatePost) {
    if (currentContent.trim().length < 20) {
      notifications.show({
        title: "Conteúdo invalido",
        message:
          "Escreva um conteúdo com mais de 20 caracteres ou edite o existente.",
        position: "top-right",
        color: "red",
      });
      return;
    }

    formData.append("title", value.title);
    formData.append("content", currentContent);
    formData.append("departmentId", `${value.departmentId}`);
    formData.append("whoPosted", whoCreator);
    formData.append("file", currentFile);

    mutation.mutate(formData);

    if (mutation.isSuccess) {
      close();
      cancelPost();
      notifications.show({
        title: "Edição do post",
        message: "Post editado com sucesso.",
        position: "top-right",
        color: "blue",
      });
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

          <Select
            required
            label="Nome do Departamento"
            placeholder="Escolha um departamento"
            key={form.key("departmentId")}
            error={form.errors.departmentId}
            {...form.getInputProps("departmentId")}
            className="self-start w-full"
            data={data?.map(({ id, name }) => ({
              value: `${id}`,
              label: name,
            }))}
            withAsterisk
            clearable
            searchable
          />

          <div className="self-center">
            <ButtonProgress targetButton="Carregar uma nova imagem" />
          </div>
          <label>Contúdo</label>
          <SimpleRichText defaultContent={content} />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Editar</Button>
            <Button onClick={onCancelEdit} color="red">
              Cancelar
            </Button>
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
