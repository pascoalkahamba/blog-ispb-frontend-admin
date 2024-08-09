"use client";
import { ButtonProgress } from "@/components/ButtonProcess";
import RichTextDemo from "@/components/RichText";
import { toast } from "react-toastify";
import { createPost } from "@/server";
import { errorAtom, selectFileAtom } from "@/storage/atom";
import { Button, Group } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";

export default function Dashboard() {
  const { data, isPending, isError, isSuccess, mutate } = useMutation({
    mutationFn: (newUser: FormData) => createPost(newUser),
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nameOfDepartment, setNameOfDepartment] = useState("");
  const file = useAtomValue(selectFileAtom);
  const setError = useSetAtom(errorAtom);

  function handlePost() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("nameOfDepartment", nameOfDepartment);
    formData.append("whoPosted", "admin");
    formData.append("file", file);
    setContent("");
    setError(true);
    mutate(formData);

    if (isSuccess) {
      toast.success("Post criado com sucesso.");
      return;
    }

    if (isError) {
      toast.error("Algo deu errado ");
    }
  }

  return (
    <section className="flex justify-center items-center w-full">
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
            target="Postar"
            targetPedding="Postando..."
            handleClick={handlePost}
            isPending={isPending}
            type="submit"
          />
          <ButtonProgress />
          <Button variant="default">Cancelar</Button>
        </div>
      </Group>
    </section>
  );
}
