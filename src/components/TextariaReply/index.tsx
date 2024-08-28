"use client";
import { Button, Textarea } from "@mantine/core";
import CustomButton from "@/components/CustomButton";
import { useField } from "@mantine/form";
import { TWhoPosted } from "@/@types";
import { useCreateComment } from "@/hooks/useCreateComment";
import { createReply, editReply } from "@/server";
import { notifications } from "@mantine/notifications";
import { useAtom, useAtomValue } from "jotai";
import { editAtom, replyAtom } from "@/storage/atom";
import { useEffect } from "react";
import { useUpdatePost } from "@/hooks/useUpdatePost";

interface TextareaReplyProps {
  labelTarget: string;
  errorTarget: string;
  buttonPendingTarget: string;
  editButtonTarget: string;
  editButtonPendingTarget: string;
  commentId: number;
  className: string;
  buttonTarget: string;
  classNameButton: string;
  placeholder: string;
}
export default function TextareaReply({
  errorTarget,
  placeholder,
  editButtonPendingTarget,
  editButtonTarget,
  className,
  classNameButton,
  commentId,
  buttonPendingTarget,
  buttonTarget,
  labelTarget,
}: TextareaReplyProps) {
  const { mutation } = useCreateComment(createReply);
  const reply = useAtomValue(replyAtom);
  const { mutation: mutationUpdateReply } = useUpdatePost(
    editReply,
    reply.id,
    "UpdateReply"
  );

  const [edit, setEdit] = useAtom(editAtom);
  const whoCreator = JSON.parse(
    localStorage.getItem("whoCreator") as string
  ) as TWhoPosted;
  const field = useField({
    mode: "controlled",
    initialValue: "",
    validate: (value) => (value.trim().length < 2 ? errorTarget : null),
  });

  console.log("textareReply");

  function cancelEdit() {
    setEdit({ type: "nothing", status: false });
    console.log("edit", edit);
    field.reset();
  }

  useEffect(() => {
    if (edit.status) {
      if (edit.type === "reply") {
        field.setValue(reply.content);
        return;
      }
    }
  }, [reply, edit]);

  async function handleClick() {
    const errorMessage = await field.validate();
    if (errorMessage) return;

    if (!edit.status) {
      mutation.mutate({
        content: field.getValue(),
        commentId,
        whoCreator,
      });
    }

    if (edit.status) {
      mutationUpdateReply.mutate(field.getValue());
    }

    if (mutation.isSuccess) {
      notifications.show({
        title: "Criação de resposta",
        message: "Resposta criado com sucesso.",
        position: "top-right",
        color: "blue",
      });
      console.log("reply", mutation.data);
      field.reset();
      return;
    }
    if (mutationUpdateReply.isSuccess) {
      notifications.show({
        title: "Edição de resposta",
        message: "Resposta editado com sucesso.",
        position: "top-right",
        color: "blue",
      });
      field.reset();
      setEdit({ type: "nothing", status: false });
      return;
    }
    if (mutation.isError) {
      notifications.show({
        title: "Criação de resposta",
        message: "Resposta não criado algo deu errado.",
        position: "top-right",
        color: "red",
      });
      return;
    }
    if (mutationUpdateReply.isError) {
      notifications.show({
        title: "Edição de resposta",
        message: "Resposta não editado algo deu errado.",
        position: "top-right",
        color: "red",
      });
      return;
    }
  }
  return (
    <div className={className}>
      <Textarea
        mt="md"
        {...field.getInputProps()}
        value={field.getValue()}
        onChange={(event) => field.setValue(event.currentTarget.value)}
        label={labelTarget}
        placeholder={placeholder}
        className={className}
      />
      <div className={classNameButton}>
        <CustomButton
          isDirty={true}
          isPending={mutation.isPending || mutationUpdateReply.isPending}
          isValid={false}
          handleClick={handleClick}
          target={
            edit.status && edit.type === "reply"
              ? editButtonTarget
              : buttonTarget
          }
          targetPedding={
            edit.status && edit.type === "reply"
              ? editButtonPendingTarget
              : buttonPendingTarget
          }
          type="submit"
        />
        {edit.status && edit.type === "reply" && (
          <Button onClick={cancelEdit} color="red">
            Cancelar
          </Button>
        )}
      </div>
    </div>
  );
}
