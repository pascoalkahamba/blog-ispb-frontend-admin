import { Menu, Group, ActionIcon, rem, useMantineTheme } from "@mantine/core";
import { IconPencilMinus, IconGripVertical } from "@tabler/icons-react";
import classes from "@/components/SplitButton/styles.module.css";
import ModalDemoDelete from "@/components/ModalDemoDelete";
import { useDeleteCommentOrReply } from "@/hooks/useDeleteCommentOrReply";
import { deleteComment, editComment } from "@/server";
import { notifications } from "@mantine/notifications";
import { useSetAtom } from "jotai";
import { commentAtom, editAtom, replyAtom } from "@/storage/atom";
import { useUpdatePost } from "@/hooks/useUpdatePost";

interface SplitButtonProps {
  trashTarget: string;
  editTarget: string;
  commentId: number | null;
  replyId: number | null;
  content: string;
}

export function SplitButton({
  trashTarget,
  editTarget,
  content,
  replyId,
  commentId,
}: SplitButtonProps) {
  const theme = useMantineTheme();
  const { mutation } = useDeleteCommentOrReply(deleteComment);
  const setComment = useSetAtom(commentAtom);
  const setReply = useSetAtom(replyAtom);
  const setEdit = useSetAtom(editAtom);

  function handleEdit() {
    setEdit(true);
    if (commentId) setComment({ id: commentId, content });
    if (replyId) setReply({ id: replyId, content });
  }

  function handleDelete() {
    if (commentId) {
      mutation.mutate(commentId);
    }
    if (mutation.isSuccess) {
      notifications.show({
        title: `Eliminar ${commentId ? "comentário" : "resposta"}`,
        message: `${
          commentId ? "Comentário" : "Resposta"
        } eliminado com sucesso.`,
        position: "top-right",
        color: "blue",
      });
      return;
    }

    if (mutation.isError) {
      notifications.show({
        title: `Eliminar ${commentId ? "comentário" : "resposta"}`,
        message: `${
          commentId ? "Comentário" : "Resposta"
        } "não eliminado algo deu errado tente novamente."`,
        position: "top-right",
        color: "red",
      });
      return;
    }
  }

  return (
    <Group wrap="nowrap" gap={0}>
      <Menu
        transitionProps={{ transition: "pop" }}
        position="bottom-end"
        withinPortal
      >
        <Menu.Target>
          <ActionIcon
            color={theme.primaryColor}
            size={36}
            className={`${classes.menuControl} bg-transparent hover:bg-slate-800`}
          >
            <IconGripVertical
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={handleEdit}
            leftSection={
              <IconPencilMinus
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                color={theme.colors.yellow[5]}
              />
            }
          >
            {editTarget}
          </Menu.Item>
          <ModalDemoDelete
            content="Tem certeza que desejas eliminar este comentário está acção irá eliminar permanente o comentário da Vitrine online."
            trashTarget={trashTarget}
            handleClick={handleDelete}
            typeModal="deleteComment"
          />
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
