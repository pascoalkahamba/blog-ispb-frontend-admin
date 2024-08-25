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
  IconTrash,
} from "@tabler/icons-react";
import classes from "@/components/EspecificPost/styles.module.css";
import { IEspecialInfoAdminOrCoordinator, IPicture } from "@/interfaces";
import Link from "next/link";
import Image from "next/image";
import { useDeletePost } from "@/hooks/useDeletePost";
import { deletePost } from "@/server";
import { notifications } from "@mantine/notifications";
import { ModalDemo } from "@/components/Modal";
import { extractTextFromHTML, MAXLENGTH, messegeDate } from "@/utils";

const dateNow = new Date();
interface EspecificPostProps {
  id: number;
  title: string;
  content: string;
  picture: IPicture;
  createdAt: typeof dateNow;
  likes: number | null;
  admin: IEspecialInfoAdminOrCoordinator | null;
  coordinator: IEspecialInfoAdminOrCoordinator | null;
  unlikes: number | null;
}

export default function EspecificPost({
  id,
  title,
  content,
  likes,
  unlikes,
  picture,
  coordinator,
  admin,
  createdAt,
}: EspecificPostProps) {
  const theme = useMantineTheme();
  const { mutation } = useDeletePost<number>(deletePost, "allPosts");

  const userId = JSON.parse(localStorage.getItem("userId") as string) as number;
  const whoCreator = !admin ? coordinator : admin;
  const plainText = extractTextFromHTML(content);
  const { dateResult } = messegeDate(new Date(createdAt), new Date());
  const truncated =
    plainText.length > MAXLENGTH
      ? plainText.substring(0, MAXLENGTH) + " Ler mais..."
      : plainText;

  function handleDeletePost() {
    mutation.mutate(id);

    if (mutation.isSuccess) {
      notifications.show({
        title: "Post eliminado",
        message: "Post eliminado com sucesso.",
        position: "top-right",
        className: "bg-blue-400 z-50",
        color: "blue",
        loading: true,
      });
      return;
    }
    if (mutation.isPending) {
      notifications.show({
        title: "Carregando para eliminar",
        message: "O Post esta no processo de eliminação.",
        position: "top-right",
        className: "bg-red-400 z-50",
        color: "orange",
        loading: true,
      });
    }
    if (mutation.isError) {
      notifications.show({
        title: "Post não eliminado",
        message: "Algo deu errado tente novamente.",
        position: "top-right",
        className: "bg-red-400 z-50",
        color: "red",
        loading: true,
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
        <Link href={`post/${id}`} className="w-full">
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
        <Link href={`post/${id}`}>{title}</Link>
      </Badge>

      <Text fw={700} className={classes.title} mt="xs">
        {plainText.length > MAXLENGTH ? (
          truncated
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        )}
      </Text>

      <Group mt="lg">
        <Link href={`profile/${userId}`}>
          <Avatar
            src={
              whoCreator?.profile?.photo.url
                ? whoCreator.profile.photo.url
                : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
            }
            radius="sm"
          />
        </Link>
        <Link href={`profile/${userId}`}>
          <Text fw={500}>{whoCreator?.username}</Text>
          <Text fz="xs" c="dimmed">
            postado {dateResult}
          </Text>
        </Link>
      </Group>

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            {likes ?? 0} people liked this
          </Text>
          <Group gap={0}>
            <ActionIcon variant="subtle" color="gray">
              <IconThumbUp
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconThumbDown
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.yellow[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ModalDemo
              typeModal="deletePost"
              handleClick={handleDeletePost}
              content="Você tem certeza que dejesas eliminar este post esta acção irá eliminar permantemente o post da vitrine online."
              targetButton="Eliminar post"
            />
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
