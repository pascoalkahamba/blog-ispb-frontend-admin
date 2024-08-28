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

interface TextareaCommentProps {
  labelTarget: string;
  errorTarget: string;
  buttonPendingTarget: string;
  editButtonTarget: string;
  editButtonPendingTarget: string;
  postId: number;
  className: string;
  buttonTarget: string;
  classNameButton: string;
  placeholder: string;
}
export default function TextareaComment({
  errorTarget,
  placeholder,
  editButtonPendingTarget,
  editButtonTarget,
  className,
  classNameButton,
  postId,
  buttonPendingTarget,
  buttonTarget,
  labelTarget,
}: TextareaCommentProps) {
  const { mutation } = useCreateComment(createComment);
  const comment = useAtomValue(commentAtom);
  const { mutation: mutationUpdateComment } = useUpdatePost(
    editComment,
    comment.id,
    "UpdateComment"
  );

  const [edit, setEdit] = useAtom(editAtom);
  const whoCreator = JSON.parse(
    localStorage.getItem("whoCreator") as string
  ) as TWhoPosted;
  const field = useField({
    initialValue: "",
    validate: (value) => (value.trim().length < 2 ? errorTarget : null),
  });

  console.log("textareaComment");

  function cancelEdit() {
    setEdit({ type: "nothing", status: false });
    console.log("edit", edit);
    field.reset();
  }

  useEffect(() => {
    if (edit.status) {
      if (edit.type === "comment") {
        field.setValue(comment.content);
        return;
      }
    }

    () => setEdit({ type: "nothing", status: false });
  }, [comment, edit]);

  async function handleClick() {
    const errorMessage = await field.validate();
    if (errorMessage) return;

    if (!edit.status) {
      mutation.mutate({
        content: field.getValue(),
        postId,
        whoCreator,
      });
    }

    if (edit.status) {
      mutationUpdateComment.mutate(field.getValue());
    }

    if (mutation.isSuccess) {
      notifications.show({
        title: "Criação de comentário",
        message: "Comentário criado com sucesso.",
        position: "top-right",
        color: "blue",
      });
      setEdit({ type: "nothing", status: false });
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
            edit.status && edit.type === "comment"
              ? editButtonTarget
              : buttonTarget
          }
          targetPedding={
            edit.status && edit.type === "comment"
              ? editButtonPendingTarget
              : buttonPendingTarget
          }
          type="submit"
        />
        {edit.status && edit.type === "comment" && (
          <Button onClick={cancelEdit} color="red">
            Cancelar
          </Button>
        )}
      </div>
    </div>
  );
}
