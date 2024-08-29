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
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { useState } from "react";
import { ICommentDataResult, ISimpleUser } from "@/interfaces";
import { messegeDate, showNameOfUser } from "@/utils";
import TextareaReply from "@/components/TextariaReply";

export default function CommentSimple({
  id,
  content,
  coordinator,
  likes,
  unlikes,
  replies,
  admin,
  createdAt,
  student,
}: ICommentDataResult) {
  const [seeReply, setSeeReply] = useState(false);
  const theme = useMantineTheme();
  const user = (
    !showNameOfUser(admin)
      ? !showNameOfUser(coordinator)
        ? showNameOfUser(student)
        : showNameOfUser(coordinator)
      : showNameOfUser(admin)
  ) as ISimpleUser;

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
        <SplitButton
          commentId={id}
          editType="comment"
          replyId={null}
          content={content}
          editTarget="Editar Comentario"
          trashTarget="Excluir Comentario"
        />
      </div>
      <Text pl={54} pt="sm" size="sm" mb={3}>
        {content}
      </Text>
      <Group gap={2} className="ml-14">
        <ActionIcon variant="subtle" color="blue">
          <IconThumbUp
            style={{ width: rem(20), height: rem(20) }}
            color={theme.colors.blue[6]}
            stroke={1.5}
          />
        </ActionIcon>
        <span className="text-xs italic">{likes}</span>
        <ActionIcon variant="subtle" color="red">
          <IconThumbDown
            style={{ width: rem(20), height: rem(20) }}
            color={theme.colors.red[6]}
            stroke={1.5}
          />
        </ActionIcon>
        <span className="text-xs italic">{unlikes}</span>
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
