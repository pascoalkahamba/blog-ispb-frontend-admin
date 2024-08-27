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

interface TextareaComponentProps {
  labelTarget: string;
  errorTarget: string;
  buttonPendingTarget: string;
  editButtonTarget: string;
  editButtonPendingTarget: string;
  postId: number | null;
  replyId: number | null;
  commentId: number | null;
  eventType: TEventType;
  className: string;
  buttonTarget: string;
  classNameButton: string;
  placeholder: string;
}
export default function TextareaComponent({
  errorTarget,
  placeholder,
  editButtonPendingTarget,
  editButtonTarget,
  className,
  replyId,
  classNameButton,
  postId,
  commentId,
  buttonPendingTarget,
  eventType,
  buttonTarget,
  labelTarget,
}: TextareaComponentProps) {
  const { mutation } = useCreateComment(createComment);
  const comment = useAtomValue(commentAtom);
  const { mutation: mutationUpdateComment } = useUpdatePost(
    editComment,
    comment.id,
    "UpdateComment"
  );

  const reply = useAtomValue(replyAtom);
  const [edit, setEdit] = useAtom(editAtom);
  const whoCreator = JSON.parse(
    localStorage.getItem("whoCreator") as string
  ) as TWhoPosted;
  const field = useField({
    initialValue: "",
    validate: (value) => (value.trim().length < 2 ? errorTarget : null),
  });

  function cancelEdit() {
    setEdit(false);
  }

  useEffect(() => {
    if (edit) {
      if (eventType === "comment") field.setValue(comment.content);
      if (eventType === "reply") field.setValue(reply.content);
    }
  }, [edit, comment, reply, eventType]);

  async function handleClick() {
    const errorMessage = await field.validate();
    if (errorMessage) return;

    if (!edit && eventType === "comment" && postId) {
      mutation.mutate({
        content: field.getValue(),
        postId,
        whoCreator,
      });
    }

    if (edit && eventType === "comment") {
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
      setEdit(false);
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
          target={edit ? editButtonTarget : buttonTarget}
          targetPedding={edit ? editButtonPendingTarget : buttonPendingTarget}
          type="submit"
        />
        {edit && (
          <Button onClick={cancelEdit} color="red">
            Cancelar
          </Button>
        )}
      </div>
    </div>
  );
}
