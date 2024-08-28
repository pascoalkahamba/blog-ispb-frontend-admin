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
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { IReplyDataResult, ISimpleUser } from "@/interfaces";
import { messegeDate, showNameOfUser } from "@/utils";

export default function ReplySimple({
  admin,
  student,
  coordinator,
  id,
  content,
  likes,
  unlikes,
  createdAt,
}: IReplyDataResult) {
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
    <div className="ml-12 mt-2 mr-12 flex justify-center gap-3 w-full flex-col">
      <Divider orientation="vertical" size="xs" className="h-22" />
      <div>
        <div className=" flex justify-between items-center">
          <Group>
            <Avatar
              src={
                user.photoUrl
                  ? user.photoUrl
                  : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
              }
              alt={user.username}
              radius="xl"
            />
            <div>
              <Text size="sm">{user.username}</Text>
              <Text size="xs" c="dimmed">
                respondido {dateResult}
              </Text>
            </div>
          </Group>
          <SplitButton
            commentId={null}
            editType="reply"
            content={content}
            replyId={id}
            editTarget="Editar Resposta"
            trashTarget="Excluir Resposta"
          />
        </div>
        <Text pl={54} pt="sm" size="sm" mb={5}>
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
        </Group>

        <Divider size="xs" className="mx-[-5rem]" />
      </div>
    </div>
  );
}
