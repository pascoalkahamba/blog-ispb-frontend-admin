"use client";
import {
  Avatar,
  Text,
  Button,
  Paper,
  useMantineTheme,
  rem,
  Group,
  Skeleton,
} from "@mantine/core";
import classes from "@/components/UserInfoProfile/styles.module.css";
import { useRouter } from "next/navigation";
import {
  IconAt,
  IconHeart,
  IconMessage,
  IconPhoneCall,
  IconUser,
  IconCircleLetterDFilled,
  IconCirclesFilled,
  IconAdjustments,
  IconCertificate,
  IconStar,
  IconNumber,
} from "@tabler/icons-react";
import ModalDemoDelete from "@/components/ModalDemoDelete";
import Link from "next/link";
import useQueryUser from "@/hooks/useQueryUser";
import { getOneUser } from "@/server";
import { TRole } from "@/@types";
import SkeletonComponent from "@/components/Skeleton";
import { showRoleName } from "@/utils";
import ModalEditUserProfile from "../ModalEditUserProfile";

interface UserInfoProfileProps {
  id: number;
  role: TRole;
}

export function UserInfoProfile({ id, role }: UserInfoProfileProps) {
  const theme = useMantineTheme();
  const {
    query: { data, error, isPending },
  } = useQueryUser(getOneUser, "getOneUser", {
    id,
    role,
  });
  const router = useRouter();
  console.log("profile id", id);

  function handleDeleteAccount() {
    console.log("eliminar conta");
  }

  if (isPending)
    return (
      <SkeletonComponent
        isPending={isPending}
        skeletons={[1]}
        width={50}
        height={300}
      />
    );
  if (error)
    return (
      <p className="font-bold text-center">
        Algo deu errado tente novamente: Usuário não encontrado
      </p>
    );
  const showDepartmentAndCourse =
    data.role === "COORDINATOR" || data.role === "USER";
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      bg="var(--mantine-color-body)"
      data-aos="fade-right"
      data-aos-duration="160"
    >
      <Avatar src={data.profile?.photo.url} size={150} radius={150} mx="auto" />
      <Group className="flex justify-center flex-col gap-1 items w-full">
        <Text ta="center" fz="lg" fw={500} mt="md">
          {data.username}
        </Text>
        <Group wrap="nowrap" gap={1}>
          <IconAt stroke={2} size="1rem" className={classes.icon} />
          <Text fz="sm" c="dimmed">
            {data.email}
          </Text>
        </Group>
        <Group wrap="nowrap" gap={1}>
          <IconPhoneCall stroke={2} size="1rem" className={classes.icon} />
          <Text c="dimmed" fz="sm">
            {data.contact}
          </Text>
        </Group>
        <Group wrap="nowrap" gap={1}>
          <IconCirclesFilled stroke={2} size="1rem" className={classes.icon} />
          <Text c="dimmed" fz="sm">
            {showRoleName(data.role)}
          </Text>
        </Group>
        {showDepartmentAndCourse && (
          <Group wrap="nowrap" gap={1}>
            <IconCircleLetterDFilled
              stroke={2}
              size="1rem"
              className={classes.icon}
            />
            <Text c="dimmed" fz="sm">
              Departamento: {data.department.name}
            </Text>
          </Group>
        )}
        {showDepartmentAndCourse && (
          <Group wrap="nowrap" gap={1}>
            <IconCertificate stroke={2} size="1rem" className={classes.icon} />
            <Text c="dimmed" fz="sm">
              Sou cordenador do curso de {data.course?.name}
            </Text>
          </Group>
        )}
      </Group>

      <Text c="dimmed" fz="sm" className="text-center py-2">
        {data.profile.bio}
      </Text>

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
        <Group wrap="nowrap" gap={1} className={classes.user}>
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
        <Group wrap="nowrap" gap={1} className={classes.user}>
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
        <ModalEditUserProfile user={data} targetButton="Editar informações" />
        <ModalDemoDelete
          isThisUserCanDelete={true}
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
