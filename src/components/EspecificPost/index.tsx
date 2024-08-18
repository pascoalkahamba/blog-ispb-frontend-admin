import {
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { IconHeart, IconBookmark, IconShare } from "@tabler/icons-react";
import classes from "@/components/EspecificPost/styles.module.css";
import { IEspecialInfoAdminOrCoordinator, IPicture } from "@/interfaces";
import Link from "next/link";

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

  const whoCreator = !admin ? coordinator : admin;

  return (
    <Card
      withBorder
      padding="lg"
      radius="md"
      className={`${classes.card} w-[20%] flex-auto basis-64 h-[10%]`}
    >
      <Link href={`post/${id}`}>
        <Card.Section mb="sm">
          <Image
            src={
              picture?.url
                ? picture.url
                : "https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            }
            alt="Imagem não carregada verifique a sua internet e tente novamente."
            height={180}
          />
        </Card.Section>

        <Badge w="fit-content" variant="light">
          {title}
        </Badge>

        <Text fw={700} className={classes.title} mt="xs">
          {content}{" "}
        </Text>

        <Group mt="lg">
          <Avatar
            src={
              whoCreator?.profile?.photo.url
                ? whoCreator.profile.photo.url
                : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
            }
            radius="sm"
          />
          <div>
            <Text fw={500}>{whoCreator?.username}</Text>
            <Text fz="xs" c="dimmed">
              posted 34 minutes ago
            </Text>
          </div>
        </Group>

        <Card.Section className={classes.footer}>
          <Group justify="space-between">
            <Text fz="xs" c="dimmed">
              {likes ?? 0} people liked this
            </Text>
            <Group gap={0}>
              <ActionIcon variant="subtle" color="gray">
                <IconHeart
                  style={{ width: rem(20), height: rem(20) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray">
                <IconBookmark
                  style={{ width: rem(20), height: rem(20) }}
                  color={theme.colors.yellow[6]}
                  stroke={1.5}
                />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray">
                <IconShare
                  style={{ width: rem(20), height: rem(20) }}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>
          </Group>
        </Card.Section>
      </Link>
    </Card>
  );
}
