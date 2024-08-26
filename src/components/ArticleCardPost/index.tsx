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
  IconThumbDown,
  IconPencilMinus,
  IconTrash,
} from "@tabler/icons-react";

import classes from "@/components/ArticleCardPost/styles.module.css";
import { deletePost, getOnePost } from "@/server";
import { useQuery } from "@tanstack/react-query";
import SkeletonComponent from "@/components/Skeleton";
import Image from "next/image";
import CommentSimple from "@/components/CommentSimple";
import TextareaComponent from "@/components/TextariaComponent";
import ModalEditPost from "@/components/ModalEditarPost";
import { messegeDate } from "@/utils/index";
import { ModalDemo } from "../Modal";
import { useDeletePost } from "@/hooks/useDeletePost";

interface ArticleCardPostProps {
  id: number;
}

export default function ArticleCardPost({ id }: ArticleCardPostProps) {
  const theme = useMantineTheme();
  const { mutation } = useDeletePost(deletePost, "onePost");

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
        width={50}
        height={500}
      />
    );

  console.log("data", data);
  if (error) return "Algo deu errado tente novamente: Post não encontrado";

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
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
          radius="sm"
        />
        <div>
          <Text fw={500}>
            {data.admin?.username
              ? data.admin.username
              : data.coordinator?.username}
          </Text>
          <Text fz="xs" c="dimmed">
            postado {dateResult}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Group gap={2}>
            <ActionIcon variant="subtle" color="blue">
              <IconThumbUp
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <span className="text-xs italic">{20}</span>

            <ActionIcon variant="subtle" color="red">
              <IconThumbDown
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <span className="text-xs italic">{30}</span>
          </Group>
          <Group gap={0}>
            <ActionIcon variant="subtle" color="gray">
              <ModalEditPost
                content={data.content}
                title={data.title}
                id={id}
                file={data.picture.name}
                nameOfDepartment={data.department.name}
              />
            </ActionIcon>
            <ModalDemo
              targetButton="Eliminar"
              content="Você tem certeza que deseja eliminar este post esta acção irá eliminar o post da vetrine para sempre."
              handleClick={handleDeletePost}
              typeModal="deletePost"
            />
          </Group>
        </Group>
      </Card.Section>
      <Divider size="xs" className="mx-[-5rem]" />
      <TextareaComponent
        labelTarget="Escreva um comentário"
        errorTarget="Comentário invalido"
        buttonTarget="Comentar"
        placeholder="Escreva seu comentario"
        className="p-2 w-full flex flex-col gap-2"
        classNameButton="ml-2"
      />
      <Divider
        size="xs"
        className="mx-[-5rem]"
        label={<Text fw={500}>Comentários</Text>}
        labelPosition="center"
      />
      <Group className="w-full mt-3">
        <CommentSimple />
        <CommentSimple />
        <CommentSimple />
      </Group>
    </Card>
  );
}
