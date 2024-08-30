"use client";

import {
  Text,
  Avatar,
  Group,
  Divider,
  ActionIcon,
  useMantineTheme,
  rem,
  Button,
} from "@mantine/core";
import ReplySimple from "@/components/ReplySimple";
import { SplitButton } from "../SplitButton";
import {
  IconThumbDown,
  IconThumbUp,
  IconThumbUpFilled,
  IconThumbDownFilled,
} from "@tabler/icons-react";
import { useState } from "react";
import { ICommentDataResult, ISimpleUser, IUser } from "@/interfaces";
import {
  currentUserCanManagerfiles,
  messegeDate,
  showNameOfUser,
} from "@/utils";
import TextareaReply from "@/components/TextariaReply";
import { useAddLikeOrUnlike } from "@/hooks/useAddLikeOrUnlike";
import { addLikeComment, addUnlikeComment } from "@/server";
import useReactions from "@/hooks/useReactions";

export default function CommentSimple({
  id,
  content,
  coordinator,
  likes,
  unlikes,
  statusLike,
  statusUnlike,
  replies,
  admin,
  createdAt,
  student,
}: ICommentDataResult) {
  const [seeReply, setSeeReply] = useState(false);
  const { mutation: mutationAddLike } = useAddLikeOrUnlike(addLikeComment);
  const { mutation: mutationAddUnlike } = useAddLikeOrUnlike(addUnlikeComment);
  const { addLike, addUnlike, reacted, reactions } = useReactions({
    like: likes,
    unlike: unlikes,
    statusLike,
    statusUnlike,
  });
  const theme = useMantineTheme();
  const user = (
    !showNameOfUser(admin)
      ? !showNameOfUser(coordinator)
        ? showNameOfUser(student)
        : showNameOfUser(coordinator)
      : showNameOfUser(admin)
  ) as ISimpleUser;

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") as string
  ) as IUser;

  const isThisUserCanManagerFiles = currentUserCanManagerfiles({
    admin,
    coordinator,
    student,
    currentUser,
  });

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

  const { dateResult } = messegeDate(new Date(createdAt), new Date());
  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center">
        <Group className="w-full flex gap-3 items-center">
          <Avatar
            src={
              user.photoUrl
                ? user.photoUrl
                : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            }
            alt={user.username}
            radius="xl"
            className="block"
          />
          <div>
            <Text size="sm">{user.username}</Text>
            <Text size="xs" c="dimmed">
              comentado {dateResult}
            </Text>
          </div>
        </Group>

        {isThisUserCanManagerFiles && (
          <SplitButton
            commentId={id}
            editType="comment"
            replyId={null}
            content={content}
            editTarget="Editar Comentario"
            trashTarget="Excluir Comentario"
          />
        )}
      </div>
      <Text pl={54} pt="sm" size="sm" mb={3}>
        {content}
      </Text>
      <Group gap={2} className="ml-14">
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
        <span className="text-xs italic">{Math.abs(likes)}</span>
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
        <span className="text-xs italic">{Math.abs(unlikes)}</span>
        <Button
          className="text-xs font-bold ml-2"
          variant="transparent"
          onClick={() => setSeeReply(!seeReply)}
        >
          {seeReply ? "Não ver mais respostas" : "Ver respostas"}
        </Button>
      </Group>
      {seeReply && (
        <TextareaReply
          editButtonPendingTarget="Editando"
          editButtonTarget="Editar"
          buttonPendingTarget="Respondendo"
          commentId={id}
          labelTarget="Responder"
          buttonTarget="Responder"
          placeholder="Escreva sua resposta"
          errorTarget="Resposta invalida"
          className="w-[90%] ml-10 flex flex-col gap-3"
          classNameButton="ml-10 flex gap-3 items-center"
        />
      )}

      {/* <Divider size="xs" className="mx-[-5rem]" /> */}

      {seeReply &&
        replies.map((reply) => <ReplySimple key={reply.id} {...reply} />)}
    </div>
  );
}
