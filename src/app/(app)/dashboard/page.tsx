"use client";
import { ButtonProgress } from "@/components/ButtonProcess";
import RichTextDemo from "@/components/RichText";
import { toast } from "react-toastify";
import { createPost, getAllPost } from "@/server";
import { errorAtom, selectFileAtom, whoCreatorAtom } from "@/storage/atom";
import { Button, Group } from "@mantine/core";
import {
  useMutation,
  RefetchQueryFilters,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import AllPosts from "@/components/AllPosts";

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { data, isPending, isError, isSuccess, mutate } = useMutation({
    mutationFn: (newUser: FormData) => createPost(newUser),
    onSuccess: (data) => {
      queryClient.fetchQuery({ queryKey: ["allPosts"], queryFn: getAllPost });
    },
  });

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
    mutate(formData);
    setError(true);

    if (isSuccess) {
      toast.success("Post criado com sucesso.");
      cancelPost();
      return;
    }

    if (isError) {
      toast.error("Algo deu errado");
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
              target="Postar"
              targetPedding="Postando..."
              handleClick={handlePost}
              isPending={isPending}
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
