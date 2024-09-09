import {
  Text,
  Avatar,
  Group,
  Divider,
  ActionIcon,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { SplitButton } from "@/components/SplitButton";
import {
  IconThumbDown,
  IconThumbUp,
  IconThumbDownFilled,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { IReplyDataResult, ISimpleUser, IUser } from "@/interfaces";
import {
  creatorUser,
  currentUserCanManagerfiles,
  messegeDate,
  showNameOfUser,
} from "@/utils";
import { useAddLikeOrUnlike } from "@/hooks/useAddLikeOrUnlike";
import { addLikeReply, addUnlikeReply } from "@/server";
import useReactions from "@/hooks/useReactions";
import Link from "next/link";

export default function ReplySimple({
  admin,
  student,
  coordinator,
  id,
  content,
  likes,
  statusLike,
  statusUnlike,
  unlikes,
  createdAt,
}: IReplyDataResult) {
  const theme = useMantineTheme();
  const { mutation: mutationAddLike } = useAddLikeOrUnlike(addLikeReply);
  const { mutation: mutationAddUnlike } = useAddLikeOrUnlike(addUnlikeReply);
  const { addLike, addUnlike, reacted, reactions } = useReactions({
    like: likes,
    unlike: unlikes,
    statusLike,
    statusUnlike,
  });

  const thisUserCreator = creatorUser(admin, coordinator, student);

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
      unlike: Math.abs(reactions.unlike),
      statusUnlike: reacted.statusUnlike,
    });
  }

  const { dateResult } = messegeDate(new Date(createdAt), new Date());

  return (
    <div className="ml-12 mt-2 mr-12 flex justify-center gap-3 w-full flex-col">
      <Divider orientation="vertical" size="xs" className="h-22" />
      <div>
        <div className=" flex justify-between items-center">
          <Group>
            <Link
              href={`/profile/${thisUserCreator?.id}/${thisUserCreator?.role}`}
              replace
            >
              <Avatar
                src={thisUserCreator?.profile.photo.url}
                alt={thisUserCreator?.username}
                radius="xl"
              />
            </Link>
            <div>
              <Link
                href={`/profile/${thisUserCreator?.id}/${thisUserCreator?.role}`}
                replace
              >
                <Text size="sm">{thisUserCreator?.username}</Text>
                <Text size="xs" c="dimmed">
                  respondido {dateResult}
                </Text>
              </Link>
            </div>
          </Group>
          {isThisUserCanManagerFiles && (
            <SplitButton
              commentId={null}
              editType="reply"
              content={content}
              replyId={id}
              editTarget="Editar Resposta"
              trashTarget="Excluir Resposta"
            />
          )}
        </div>
        <Text pl={54} pt="sm" size="sm" mb={5}>
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
        </Group>

        <Divider size="xs" className="mx-[-5rem]" />
      </div>
    </div>
  );
}
