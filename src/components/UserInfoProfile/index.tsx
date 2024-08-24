"use client";
import {
  Avatar,
  Text,
  Button,
  Paper,
  useMantineTheme,
  rem,
  Group,
} from "@mantine/core";
import classes from "@/components/UserInfoProfile/styles.module.css";
import { useRouter } from "next/navigation";
import {
  IconAt,
  IconHeart,
  IconMessage,
  IconPhoneCall,
  IconStar,
} from "@tabler/icons-react";
import { ModalDemo } from "@/components/Modal";
import Link from "next/link";

interface UserInfoProfileProps {
  id: number;
}

export function UserInfoProfile({ id }: UserInfoProfileProps) {
  const theme = useMantineTheme();
  const router = useRouter();
  console.log("profile id", id);

  function handleDeleteAccount() {
    console.log("eliminar conta");
  }
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      bg="var(--mantine-color-body)"
      data-aos="fade-right"
      data-aos-duration="160"
    >
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
        size={150}
        radius={150}
        mx="auto"
      />
      <Group className="flex justify-center flex-col gap-1 items w-full">
        <Text ta="center" fz="lg" fw={500} mt="md">
          Pascoal Kahamba
        </Text>
        <Group wrap="nowrap" gap={1}>
          <IconAt stroke={2} size="1rem" className={classes.icon} />
          <Text fz="sm" c="dimmed">
            pascoalkahamba25@gmail.com
          </Text>
        </Group>
        <Group wrap="nowrap" gap={1}>
          <IconPhoneCall stroke={2} size="1rem" className={classes.icon} />
          <Text c="dimmed" fz="sm">
            941900324/958633607
          </Text>
        </Group>
        <Group wrap="nowrap" gap={1}>
          <IconPhoneCall stroke={2} size="1rem" className={classes.icon} />
          <Text c="dimmed" fz="sm">
            Administrador
          </Text>
        </Group>
        <Group wrap="nowrap" gap={1}>
          <IconPhoneCall stroke={2} size="1rem" className={classes.icon} />
          <Text c="dimmed" fz="sm">
            Departamento: Engenharia
          </Text>
        </Group>
        <Group wrap="nowrap" gap={1}>
          <IconPhoneCall stroke={2} size="1rem" className={classes.icon} />
          <Text c="dimmed" fz="sm">
            Curso: Informatica
          </Text>
        </Group>
      </Group>

      <Group className="flex justify-center items-center gap-2 w-full">
        <Group wrap="nowrap" gap={1} className={classes.user}>
          <IconMessage
            style={{ width: rem(16), height: rem(16) }}
            color={theme.colors.blue[6]}
            stroke={2}
            target="Meus comentarios"
          />
          <Text c="dimmed" fz="sm">
            Meus Posts
          </Text>
        </Group>
        <Group wrap="nowrap" gap={1}>
          <IconHeart
            style={{ width: rem(16), height: rem(16) }}
            color={theme.colors.red[6]}
            stroke={2}
            target="Meus Posts"
            viewTarget="Meus cometarios"
          />
          <Text c="dimmed" fz="sm">
            Meus comentarios
          </Text>
        </Group>
        <Group wrap="nowrap" gap={1}>
          <IconStar
            style={{ width: rem(16), height: rem(16) }}
            color={theme.colors.yellow[6]}
            stroke={2}
            target="Posts salvos"
          />
          <Text c="dimmed" fz="sm">
            Post salvos
          </Text>
        </Group>
      </Group>
      <Group className="flex justify-center items-center gap-5 w-full mt-3">
        <Button variant="gradient" className="px-5">
          Activo
        </Button>
        <Button variant="gradient" className="px-5">
          Editar Informações
        </Button>
        <ModalDemo
          targetButton="Eliminar conta"
          typeModal="deleteAccount"
          handleClick={handleDeleteAccount}
          content="Tem certesa que deseja mesmo eliminar sua conta está acção irá
          eliminar permantemente a sua conta da vitrine online.
"
        />
        <Button variant="default" className="px-5">
          <Link href="/signin">Sair</Link>
        </Button>
      </Group>
    </Paper>
  );
}
