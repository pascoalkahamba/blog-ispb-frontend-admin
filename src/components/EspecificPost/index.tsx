import {
  Card,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  useMantineTheme,
  rem,
} from "@mantine/core";
import {
  IconThumbUp,
  IconThumbUpFilled,
  IconThumbDown,
  IconThumbDownFilled,
} from "@tabler/icons-react";
import classes from "@/components/EspecificPost/styles.module.css";
import { IPicture, IUser } from "@/interfaces";
import Link from "next/link";
import Image from "next/image";
import { useDeletePost } from "@/hooks/useDeletePost";
import { addLikePost, addUnlikePost, deletePost } from "@/server";
import { notifications } from "@mantine/notifications";
import ModalDemoDelete from "@/components/ModalDemoDelete";
import {
  currentUserCanManagerfiles,
  extractTextFromHTML,
  MAXLENGTH,
  messegeDate,
} from "@/utils";
import { useAddLikeOrUnlike } from "@/hooks/useAddLikeOrUnlike";
import useReactions from "@/hooks/useReactions";

const dateNow = new Date();
interface EspecificPostProps {
  id: number;
  title: string;
  statusLike: boolean;
  statusUnlike: boolean;
  content: string;
  picture: IPicture;
  createdAt: typeof dateNow;
  likes: number;
  admin: IUser | null;
  coordinator: IUser | null;
  unlikes: number;
}

export default function EspecificPost({
  id,
  title,
  content,
  likes,
  unlikes,
  statusLike,
  statusUnlike,
  picture,
  coordinator,
  admin,
  createdAt,
}: EspecificPostProps) {
  const theme = useMantineTheme();
  const { mutation } = useDeletePost<number>(deletePost, "allPosts");
  const { mutation: mutationLikePost } = useAddLikeOrUnlike(addLikePost);
  const { mutation: mutationUnlikePost } = useAddLikeOrUnlike(addUnlikePost);
  const userId = JSON.parse(localStorage.getItem("userId") as string) as number;
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") as string
  ) as IUser;

  const isThisUserCanManagerFiles = currentUserCanManagerfiles({
    admin,
    coordinator,
    student: null,
    currentUser,
  });

  const whoCreator = !admin ? coordinator : admin;
  const plainText = extractTextFromHTML(content);
  const { addLike, addUnlike, reacted, reactions } = useReactions({
    like: likes,
    unlike: unlikes,
    statusLike,
    statusUnlike,
  });
  const { dateResult } = messegeDate(new Date(createdAt), new Date());
  const truncated =
    plainText.length > MAXLENGTH
      ? plainText.substring(0, MAXLENGTH) + " Ler mais..."
      : plainText;

  function handleAddLike() {
    addLike();
    mutationLikePost.mutate({
      id,
      like: reactions.like,
      statusLike: reacted.statusLike,
    });
  }

  function handleAddUnlike() {
    addUnlike();
    mutationUnlikePost.mutate({
      id,
      unlike: Math.abs(reactions.unlike),
      statusUnlike: reacted.statusUnlike,
    });
  }

  function handleDeletePost() {
    mutation.mutate(id);

    if (mutation.isSuccess) {
      notifications.show({
        title: "Post eliminado",
        message: "Post eliminado com sucesso.",
        position: "top-right",
        color: "blue",
      });
      return;
    }
    if (mutation.isPending) {
      notifications.show({
        title: "Carregando para eliminar",
        message: "O Post esta no processo de eliminação.",
        position: "top-right",
        color: "orange",
      });
    }
    if (mutation.isError) {
      notifications.show({
        title: "Post não eliminado",
        message: "Algo deu errado tente novamente.",
        position: "top-right",
        color: "red",
      });
      return;
    }
  }
  return (
    <Card
      withBorder
      padding="lg"
      radius="md"
      className={`${classes.card} w-[30%] flex-grow basis-64 h-[30%]`}
    >
      <Card.Section mb="sm">
        <Link
          href={`post/${id}/${Math.abs(likes)}/${Math.abs(
            unlikes
          )}/${statusLike}/${statusUnlike}`}
          className="w-full"
        >
          <Image
            src={
              picture?.url
                ? picture.url
                : "https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            }
            alt="Imagem não carregada verifique a sua internet e tente novamente."
            height={400}
            width={500}
            className="w-full"
          />
        </Link>
      </Card.Section>

      <Badge w="fit-content" variant="light">
        <Link
          href={`post/${id}/${Math.abs(likes)}/${Math.abs(
            unlikes
          )}/${statusLike}/${statusUnlike}`}
        >
          {title}
        </Link>
      </Badge>

      <Text fw={700} className={classes.title} mt="xs">
        {plainText.length > MAXLENGTH ? (
          truncated
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        )}
      </Text>

      <Group mt="lg">
        <Link href={`profile/${whoCreator?.id}`}>
          <Avatar
            src={
              whoCreator?.profile?.photo.url
                ? whoCreator.profile.photo.url
                : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            }
            radius="sm"
          />
        </Link>
        <Link href={`profile/${whoCreator?.id}/${whoCreator?.role}`}>
          <Text fw={500}>{whoCreator?.username}</Text>
          <Text fz="xs" c="dimmed">
            postado {dateResult}
          </Text>
        </Link>
      </Group>

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            {Math.abs(likes)} pessoais que gostaram
          </Text>
          <Group gap={0}>
            <ActionIcon variant="subtle" color="gray">
              {reacted.statusLike ? (
                <IconThumbUpFilled
                  onClick={handleAddLike}
                  style={{ width: rem(20), height: rem(20) }}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              ) : (
                <IconThumbUp
                  onClick={handleAddLike}
                  style={{ width: rem(20), height: rem(20) }}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              )}
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              {reacted.statusUnlike ? (
                <IconThumbDownFilled
                  onClick={handleAddUnlike}
                  style={{ width: rem(20), height: rem(20) }}
                  color={theme.colors.yellow[6]}
                  stroke={1.5}
                />
              ) : (
                <IconThumbDown
                  onClick={handleAddUnlike}
                  style={{ width: rem(20), height: rem(20) }}
                  color={theme.colors.yellow[6]}
                  stroke={1.5}
                />
              )}
            </ActionIcon>
            <ModalDemoDelete
              isThisUserCanDelete={isThisUserCanManagerFiles}
              typeModal="deletePost"
              handleClick={handleDeletePost}
              content="Você tem certeza que dejesas eliminar este post esta acção irá eliminar permantemente o post da vitrine online."
            />
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
