"use client";
import cx from "clsx";
import { useState } from "react";
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
  Autocomplete,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconTrash,
  IconChevronDown,
  IconSearch,
} from "@tabler/icons-react";
import classes from "@/components/HeaderMain/styles.module.css";
import { searchData } from "@/mocks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IUser } from "@/interfaces";
import { useDeleteCommentOrReply } from "@/hooks/useDeleteCommentOrReply";
import {
  deleteUser,
  getAllDepartments,
  getAllPost,
  getOneUser,
} from "@/server";
import { notifications } from "@mantine/notifications";
import { showRoleName } from "@/utils";
import ModalDemoDelete from "../ModalDemoDelete";
import useQueryUser from "@/hooks/useQueryUser";
import useQueryPost from "@/hooks/useQueryPost";
import { departmentIdAtom } from "@/storage/atom";
import { useAtom } from "jotai";

export default function HeaderMain() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [departmentId, setDepartmentId] = useAtom(departmentIdAtom);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const {
    query: { data },
  } = useQueryPost(getAllPost, "allPosts", departmentId);

  const {
    query: { data: departments },
  } = useQueryPost(getAllDepartments, "allDepartments", null);
  console.log("posts cursos", data);
  console.log("departmentId", departmentId);

  const user = JSON.parse(
    localStorage.getItem("currentUser") as string
  ) as IUser;

  const { id, role } = user;
  const {
    query: { data: currentUser },
  } = useQueryUser(getOneUser, `getOneUser-${role}-${id}`, {
    id,
    role,
  });
  const { mutation } = useDeleteCommentOrReply(
    deleteUser,
    showNotificationOnSuccess,
    showNotificationOnError,
    `deleteUser-${role}-${id}`
  );
  const allDepartments = departments?.map(({ id, name }) => (
    <Tabs.Tab value={name} key={id} onClick={() => setDepartmentId(id)}>
      {name}
    </Tabs.Tab>
  ));

  function showNotificationOnSuccess() {
    notifications.show({
      title: `Exclusão da conta ${showRoleName(role)}`,
      message: `Senhor ${showRoleName(role)} sua conta foi eliminda.`,
      position: "top-right",
      color: "blue",
    });
    router.replace("/signin");
  }

  function showNotificationOnError() {
    notifications.show({
      title: `Exclusão da conta ${showRoleName(role)}`,
      message: `Senhor ${showRoleName(
        role
      )} sua conta não foi eliminda verifique os dados e tente novamente.`,
      position: "top-right",
      color: "red",
    });
  }

  const router = useRouter();
  const handleDeleteAccount = () => mutation.mutate({ id, role });

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <h1>ISPB</h1>
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group gap={7}>
                  <Avatar
                    src={currentUser?.profile.photo.url}
                    alt={currentUser?.username}
                    radius="xl"
                    size={20}
                  />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {currentUser?.username}
                  </Text>
                  <IconChevronDown
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconHeart
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
              >
                posts gostados
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconStar
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
              >
                posts salvos
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconMessage
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Seus comentarios
              </Menu.Item>

              <Menu.Label>Configurações</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconSettings
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                <Link href={`/profile/${id}/${role}`}>Definições da conta</Link>
              </Menu.Item>

              <Menu.Item
                leftSection={
                  <IconLogout
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                <Link href="/signin">Sair</Link>
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>zona de perigo</Menu.Label>
              <Menu.Item
                color="red"
                leftSection={
                  <IconTrash
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                <ModalDemoDelete
                  isThisUserCanDelete={false}
                  editOnHeader
                  targetButton="Eliminar conta"
                  typeModal="deleteAccountOnHeader"
                  handleClick={handleDeleteAccount}
                  content={`Carissimo ${showRoleName(
                    role
                  )}, tem certesa que deseja mesmo eliminar sua conta está acção irá
            eliminar permantemente a sua conta da vitrine online.`}
                />
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Container size="md">
        <Tabs
          defaultValue="Home"
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>
            <Tabs.Tab
              value="Página inicial"
              onClick={() => setDepartmentId(null)}
            >
              <Link href="/dashboard">Página inicial</Link>
            </Tabs.Tab>

            {allDepartments}

            <Autocomplete
              placeholder="Search"
              leftSection={
                <IconSearch
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
              data={searchData}
              visibleFrom="xs"
            />
          </Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
}
