"use client";
import { Button, Textarea } from "@mantine/core";
import CustomButton from "@/components/CustomButton";
import { useField } from "@mantine/form";
import { TEventType, TWhoPosted } from "@/@types";
import { useCreateComment } from "@/hooks/useCreateComment";
import { createComment, editComment } from "@/server";
import { notifications } from "@mantine/notifications";
import { useAtom, useAtomValue } from "jotai";
import { commentAtom, editAtom, replyAtom } from "@/storage/atom";
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
  const { mutation } = useCreateComment(createComment);
  const reply = useAtomValue(replyAtom);
  const { mutation: mutationUpdateComment } = useUpdatePost(
    editComment,
    reply.id,
    "UpdateComment"
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

    if (!edit.status && edit.type === "reply") {
      mutation.mutate({
        content: field.getValue(),
        commentId,
        whoCreator,
      });
    }

    if (edit.status && edit.type === "reply") {
      mutationUpdateComment.mutate(field.getValue());
    }

    if (mutation.isSuccess) {
      notifications.show({
        title: "Criação de comentário",
        message: "Comentário criado com sucesso.",
        position: "top-right",
        color: "blue",
      });
      field.reset();
      return;
    }
    if (mutationUpdateComment.isSuccess) {
      notifications.show({
        title: "Edição de comentário",
        message: "Comentário editado com sucesso.",
        position: "top-right",
        color: "blue",
      });
      field.reset();
      setEdit({ type: "nothing", status: false });
      return;
    }
    if (mutation.isError) {
      notifications.show({
        title: "Criação de comentário",
        message: "Comentário não criado algo deu errado.",
        position: "top-right",
        color: "red",
      });
      return;
    }
    if (mutationUpdateComment.isError) {
      notifications.show({
        title: "Edição de comentário",
        message: "Comentário não editado algo deu errado.",
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
          isPending={mutation.isPending || mutationUpdateComment.isPending}
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
