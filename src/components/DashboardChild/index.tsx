"use client";
import { ButtonProgress } from "@/components/ButtonProcess";
import RichTextDemo from "@/components/RichText";
import { notifications } from "@mantine/notifications";
import { createPost } from "@/server";
import { errorAtom, selectFileAtom } from "@/storage/atom";
import { Button, Group } from "@mantine/core";
import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import AllPosts from "@/components/AllPosts";
import { IPost } from "@/interfaces";
import { useMutationPost } from "@/hooks/useMutationPost";

export default function DashboardChild() {
  const { mutation } = useMutationPost<FormData, IPost>(createPost, "allPosts");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nameOfDepartment, setNameOfDepartment] = useState("");
  const [file, setFile] = useAtom(selectFileAtom);
  const setError = useSetAtom(errorAtom);
  const whoCreator = JSON.parse(localStorage.getItem("whoCreator") as string);

  function cancelPost() {
    setContent("");
    setTitle("");
    console.log("cancelar");
    console.log("title", title);
    setNameOfDepartment("");
    setFile("");
    setError(false);
  }
  console.log("whoCreator", whoCreator);

  function handlePost() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("nameOfDepartment", nameOfDepartment);
    formData.append("whoPosted", whoCreator);
    formData.append("file", file);
    mutation.mutate(formData);
    setError(true);

    if (mutation.isSuccess) {
      notifications.show({
        title: "Post criado",
        message: "Post criado com sucesso.",
        position: "top-right",
        className: "bg-blue-400 z-50",
        color: "blue",
        loading: true,
      });
      cancelPost();
      return;
    }

    if (mutation.isError) {
      notifications.show({
        title: "Post não criado",
        message: "Algo deu errado verifique os dados e tente novamente.",
        position: "top-right",
        color: "red",
        loading: true,
        className: "z-50 bg-red-400",
      });
      return;
    }
  }

  return (
    <section className="w-full flex items-center flex-col gap-3">
      <div className="flex justify-center items-center w-full">
        <Group className="flex flex-col gap-2">
          <RichTextDemo
            content={content}
            title={title}
            nameOfDepartamnet={nameOfDepartment}
            setNameOfDepartament={setNameOfDepartment}
            setContent={setContent}
            setTitle={setTitle}
          />
          <div className="flex items-center gap-3">
            <CustomButton
              isDirty={true}
              isValid={false}
              target="Postar"
              targetPedding="Postando..."
              handleClick={handlePost}
              isPending={mutation.isPending}
              type="submit"
            />
            <ButtonProgress />
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
