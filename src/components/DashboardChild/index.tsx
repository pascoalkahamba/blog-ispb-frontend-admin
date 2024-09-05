"use client";
import { ButtonProgress } from "@/components/ButtonProcess";
import RichTextDemo from "@/components/RichText";
import { notifications } from "@mantine/notifications";
import { createPost } from "@/server";
import {
  errorAtom,
  selectFileAtom,
  titleAtom,
  contentAtom,
  departmentIdAtom,
} from "@/storage/atom";
import { Button, Group } from "@mantine/core";
import { useAtom, useSetAtom } from "jotai";
import CustomButton from "@/components/CustomButton";
import AllPosts from "@/components/AllPosts";
import { IPost } from "@/interfaces";
import { useMutationPost } from "@/hooks/useMutationPost";

export default function DashboardChild() {
  const [title, setTitle] = useAtom(titleAtom);
  const [content, setContent] = useAtom(contentAtom);
  const [departmentId, setDepartmentId] = useAtom(departmentIdAtom);
  const [file, setFile] = useAtom(selectFileAtom);
  const setError = useSetAtom(errorAtom);
  const whoCreator = JSON.parse(localStorage.getItem("whoCreator") as string);
  const formData = new FormData();

  function cancelPost() {
    setContent("");
    setTitle("");
    setDepartmentId(null);
    setFile("");
    setError(false);
  }

  function showNotificationOnSuccess() {
    notifications.show({
      title: "Criação de post",
      message: "Post criado com sucesso.",
      position: "top-right",
      color: "blue",
    });
    cancelPost();
  }
  function showNotificationOnError() {
    notifications.show({
      title: "Criação de post",
      message: "Algo deu errado verifique os dados e tente novamente.",
      position: "top-right",
      color: "red",
    });
  }

  const { mutation } = useMutationPost<FormData, IPost>(
    createPost,
    showNotificationOnSuccess,
    showNotificationOnError,
    "allPosts"
  );

  function handlePost() {
    formData.append("title", title);
    formData.append("content", content);
    formData.append("departmentId", `${departmentId}`);
    formData.append("whoPosted", whoCreator);
    formData.append("file", file);
    setError(true);
    mutation.mutate(formData);
  }

  return (
    <section className="w-full flex items-center flex-col gap-3">
      <div className="flex justify-center items-center w-full">
        <Group className="flex flex-col gap-2">
          <RichTextDemo
            content={content}
            title={title}
            setContent={setContent}
            setTitle={setTitle}
          />
          <div className="flex items-center gap-3">
            <CustomButton
              isDirty={true}
              isValid={false}
              target="Postar"
              targetPedding="Postando"
              handleClick={handlePost}
              isPending={mutation.isPending}
              type="submit"
            />
            <ButtonProgress targetButton="Carregar imagem" />
            <Button variant="default" onClick={cancelPost}>
              Cancelar
            </Button>
          </div>
        </Group>
      </div>

      <AllPosts />
    </section>
  );
}
