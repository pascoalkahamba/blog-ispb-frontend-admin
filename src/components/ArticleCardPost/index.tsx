"use client";
import {
  Card,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  useMantineTheme,
  rem,
  Divider,
} from "@mantine/core";
import {
  IconThumbUp,
  IconThumbUpFilled,
  IconThumbDown,
  IconThumbDownFilled,
} from "@tabler/icons-react";

import classes from "@/components/ArticleCardPost/styles.module.css";
import { addLikePost, addUnlikePost, deletePost, getOnePost } from "@/server";
import { useQuery } from "@tanstack/react-query";
import SkeletonComponent from "@/components/Skeleton";
import Image from "next/image";
import CommentSimple from "@/components/CommentSimple";
import TextareaComment from "@/components/TextariaComment";
import ModalEditPost from "@/components/ModalEditarPost";
import { currentUserCanManagerfiles, messegeDate } from "@/utils/index";
import ModalDemoDelete from "@/components/ModalDemoDelete";
import { useDeletePost } from "@/hooks/useDeletePost";
import { useAddLikeOrUnlike } from "@/hooks/useAddLikeOrUnlike";
import useReactions from "@/hooks/useReactions";
import { IUser } from "@/interfaces";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

interface ArticleCardPostProps {
  id: number;
  likes: number;
  unlikes: number;
  statusLike: boolean;
  statusUnlike: boolean;
}

export default function ArticleCardPost({
  id,
  likes,
  statusLike,
  statusUnlike,
  unlikes,
}: ArticleCardPostProps) {
  const theme = useMantineTheme();
  const { mutation: mutationAddLike } = useAddLikeOrUnlike(addLikePost);
  const { mutation: mutationAddUnlike } = useAddLikeOrUnlike(addUnlikePost);
  const { addLike, addUnlike, reacted, reactions } = useReactions({
    like: +likes,
    unlike: +unlikes,
    statusLike: Boolean(statusLike),
    statusUnlike: Boolean(statusUnlike),
  });

  const router = useRouter();
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") as string
  ) as IUser;

  function showNotificationOnSuccess() {
    notifications.show({
      title: "Post eliminado",
      message: "Post eliminado com sucesso.",
      position: "top-right",
      color: "blue",
    });

    router.replace("/dashboard");
  }

  function showNotificationOnError() {
    notifications.show({
      title: "Post não eliminado",
      message: "Algo deu errado tente novamente.",
      position: "top-right",
      color: "red",
    });
  }

  const { mutation } = useDeletePost(
    deletePost,
    showNotificationOnSuccess,
    showNotificationOnError,
    "onePost"
  );

  const handleDeletePost = () => mutation.mutate(id);
  const { data, error, isPending } = useQuery({
    queryKey: ["onePost"],
    queryFn: () => getOnePost(id),
  });

  if (isPending)
    return (
      <SkeletonComponent
        isPending={isPending}
        skeletons={[1]}
        width={100}
        height={700}
      />
    );

  console.log("data", data);
  if (error) return "Algo deu errado tente novamente: Post não encontrado";

  const isThisUserCanManagerFiles = currentUserCanManagerfiles({
    admin: data?.admin,
    coordinator: data?.coordinator,
    student: null,
    currentUser,
  });

  const whoCreator = !data.admin ? data.coordinator : data.admin;
  function handleAddLike() {
    addLike();
    mutationAddLike.mutate({
      id,
      like: reactions.like,
      statusLike: reacted.statusLike,
    });
  }

  function handleAddUnlike() {
    addUnlike();
    mutationAddUnlike.mutate({
      id,
      unlike: reactions.unlike,
      statusUnlike: reacted.statusUnlike,
    });
  }
  const { dateResult } = messegeDate(new Date(data.createdAt), new Date());
  return (
    <Card
      withBorder
      padding="lg"
      radius="md"
      className={`${classes.card} w-[60%]`}
    >
      <Card.Section mb="sm">
        <Image
          src={
            data.picture.url
              ? data.picture.url
              : "https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
          }
          alt="Top 50 underrated plants for house decoration"
          height={80}
          width={600}
          className="w-full"
        />
      </Card.Section>

      <Badge w="fit-content" variant="light" className="text-center" size="xl">
        {data.title}
      </Badge>

      <Text
        fw={700}
        className={classes.title}
        mt="xs"
        dangerouslySetInnerHTML={{ __html: data.content }}
      ></Text>

      <Group mt="lg">
        <Link href={`/profile/${whoCreator?.id}/${whoCreator?.role}`} replace>
          <Avatar src={whoCreator?.profile.photo.url} radius="sm" />
        </Link>
        <div>
          <Link href={`/profile/${whoCreator?.id}/${whoCreator?.role}`} replace>
            <Text fw={500}>{whoCreator?.username}</Text>
            <Text fz="xs" c="dimmed">
              postado {dateResult}
            </Text>
          </Link>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Group gap={2}>
            <ActionIcon variant="subtle" color="blue">
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
            <span className="text-xs italic">{Math.abs(data.likes)}</span>

            <ActionIcon variant="subtle" color="red">
              {reacted.statusUnlike ? (
                <IconThumbDownFilled
                  onClick={handleAddUnlike}
                  style={{ width: rem(20), height: rem(20) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              ) : (
                <IconThumbDown
                  onClick={handleAddUnlike}
                  style={{ width: rem(20), height: rem(20) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              )}
            </ActionIcon>
            <span className="text-xs italic">{Math.abs(data.unlikes)}</span>
          </Group>
          {isThisUserCanManagerFiles && (
            <Group gap={0}>
              <ActionIcon variant="subtle" color="gray">
                <ModalEditPost
                  content={data.content}
                  title={data.title}
                  id={id}
                  file={data.picture.name}
                  departmentId={data.department.id}
                />
              </ActionIcon>
              <ModalDemoDelete
                editOnHeader={false}
                isThisUserCanDelete={isThisUserCanManagerFiles}
                targetButton="Eliminar"
                content="Você tem certeza que deseja eliminar este post esta acção irá eliminar o post da vetrine para sempre."
                handleClick={handleDeletePost}
                typeModal="deletePost"
              />
            </Group>
          )}
        </Group>
      </Card.Section>
      <Divider size="xs" className="mx-[-5rem]" />
      <TextareaComment
        buttonPendingTarget="Comentando"
        editButtonPendingTarget="Editando"
        editButtonTarget="Editar"
        postId={id}
        labelTarget="Escreva um comentário"
        errorTarget="Comentário muito curto"
        buttonTarget="Comentar"
        placeholder="Escreva seu comentário"
        className="p-2 w-full flex flex-col gap-1"
        classNameButton="ml-2 flex gap-3 items-center"
      />
      <Divider
        size="xs"
        className="mx-[-5rem]"
        label={<Text fw={500}>Comentários</Text>}
        labelPosition="center"
      />
      <Group className="w-full mt-3">
        {data.comments.length === 0 ? (
          <p className="font-bold text-center w-full">
            Nenhum comentário encontrado seja o primeiro a criar o comentário.
          </p>
        ) : (
          data.comments.map((comment) => (
            <CommentSimple key={comment.id} {...comment} />
          ))
        )}
      </Group>
    </Card>
  );
}
