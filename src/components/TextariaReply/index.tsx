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
  const { mutation } = useCreateComment(
    createReply,
    showNotificationCreateOnSuccess,
    showNotificationCreateOnError
  );
  const reply = useAtomValue(replyAtom);
  const { mutation: mutationUpdateReply } = useUpdatePost(
    editReply,
    showNotificationEditOnSuccess,
    showNotificationEditOnError,
    reply.id,
    "UpdateReply"
  );

  const [edit, setEdit] = useAtom(editAtom);
  const whoCreator = JSON.parse(
    localStorage.getItem("whoCreator") as string
  ) as TWhoPosted;
  const field = useField({
    initialValue: "",
    validate: (value) => (value.trim().length < 2 ? errorTarget : null),
  });

  function cancelEdit() {
    setEdit({ type: "nothing", status: false });
    console.log("edit", edit);
    field.reset();
  }

  function showNotificationCreateOnSuccess() {
    notifications.show({
      title: "Criação de resposta",
      message: "Resposta criado com sucesso.",
      position: "top-right",
      color: "blue",
    });
    field.reset();
    setEdit({ type: "nothing", status: false });
  }
  function showNotificationEditOnSuccess() {
    notifications.show({
      title: "Edição de resposta",
      message: "Resposta editada com sucesso.",
      position: "top-right",
      color: "blue",
    });
    field.reset();
    setEdit({ type: "nothing", status: false });
  }
  function showNotificationCreateOnError() {
    notifications.show({
      title: "Criação de resposta",
      message: "Resposta não criado algo deu errado.",
      position: "top-right",
      color: "red",
    });
  }
  function showNotificationEditOnError() {
    notifications.show({
      title: "Edição de resposta",
      message: "Resposta não editada algo deu errado.",
      position: "top-right",
      color: "red",
    });
  }

  useEffect(() => {
    if (edit.status) {
      if (edit.type === "reply") {
        field.setValue(reply.content);
        return;
      }
    }
    () => setEdit({ type: "nothing", status: false });
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
