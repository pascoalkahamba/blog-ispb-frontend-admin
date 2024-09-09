import { TRole } from "@/@types";
import {
  ActionIcon,
  Menu,
  rem,
  PasswordInput,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Modal,
  Text,
  TextInput,
  useMantineTheme,
  Textarea,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ButtonProgress } from "@/components/ButtonProcess";
import { IUpdateUserProfile, IUser } from "@/interfaces";
import { zodResolver } from "mantine-form-zod-resolver";
import { updateProfileSchema } from "@/schemas";
import { useDisclosure } from "@mantine/hooks";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import {
  getAllCoursesFromDepartment,
  getAllDepartments,
  updateUserProfile,
} from "@/server";
import { useAtomValue } from "jotai";
import { selectFileAtom } from "@/storage/atom";
import { notifications } from "@mantine/notifications";
import { showRoleName } from "@/utils";
import useQueryPost from "@/hooks/useQueryPost";
import { useMemo } from "react";

interface ModalDemoProps {
  targetButton: string;
  user: IUser;
}

export default function ModalEditUserProfile({
  targetButton,
  user,
}: ModalDemoProps) {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const { mutation } = useUpdateUser(
    updateUserProfile,
    showNotificationOnSuccess,
    showNotificationOnError
  );
  const {
    query: { data: departments },
  } = useQueryPost(getAllDepartments, "allDepartments", null);
  const currentFile = useAtomValue(selectFileAtom);

  const { role, username, contact, course, department, email, id, profile } =
    user;
  const formdata = new FormData();
  const form = useForm({
    initialValues: {
      email,
      username,
      departmentId: department?.id ?? 0,
      courseId: course?.id ?? 0,
      contact,
      password: "",
      bio: profile.bio,
    },
    validate: zodResolver(updateProfileSchema),
  });

  function showNotificationOnSuccess() {
    notifications.show({
      title: "Edição do perfil.",
      message: "Seu perfil foi editado com sucesso.",
      position: "top-right",
      color: "blue",
    });
    form.reset();
    close();
  }
  function showNotificationOnError() {
    notifications.show({
      title: "Edição do perfil.",
      message:
        "Seu perfil não foi editado verifique os dados e tente novamente.",
      position: "top-right",
      color: "red",
    });
  }

  const {
    query: { data: courses },
  } = useQueryPost(
    getAllCoursesFromDepartment,
    `getAllCourses${form.values.departmentId}`,
    form.values.departmentId
  );

  const allDepartments = useMemo(() => {
    return departments?.map(({ id, name }) => ({
      value: `${id}`,
      label: name,
    }));
  }, [departments]);

  const allCourses = useMemo(() => {
    return courses?.map(({ id, name }) => ({
      value: `${id}`,
      label: name,
    }));
  }, [courses]);

  function handleEditProfile(values: IUpdateUserProfile) {
    formdata.append("username", values.username);
    formdata.append("bio", values.bio);
    formdata.append("contact", values.contact);
    formdata.append("password", values.password);
    formdata.append("email", values.email);
    formdata.append("file", currentFile);

    if (role === "COORDINATOR") {
      formdata.append("departmentId", `${values.departmentId}`);
      formdata.append("courseId", `${values.courseId}`);
    }

    mutation.mutate({ formdata, id, role });
  }

  function onCancelFn() {
    form.reset();
    close();
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={`Editar informações do ${showRoleName(role)}`}
        size="xl"
      >
        <Paper radius="md" p="xl" withBorder>
          <form onSubmit={form.onSubmit(handleEditProfile)}>
            <Stack>
              <TextInput
                required
                label="Novo nome"
                placeholder="Digite seu novo nome"
                value={form.values.username}
                onChange={(event) =>
                  form.setFieldValue("username", event.currentTarget.value)
                }
                error={form.errors.username}
                radius="md"
              />

              <TextInput
                required
                type="number"
                label="Novo número"
                placeholder="Digite seu novo numero"
                value={form.values.contact}
                onChange={(event) =>
                  form.setFieldValue("contact", event.currentTarget.value)
                }
                error={form.errors.contact}
                radius="md"
              />
              {role === "COORDINATOR" && (
                <Select
                  required
                  label="Escolha um novo Departamento"
                  placeholder="Escolha um departamento"
                  value={`${form.values.departmentId}`}
                  onChange={(value) => {
                    if (value) form.setFieldValue("departmentId", +value);
                  }}
                  error={form.errors.departmentId}
                  className="self-start w-full"
                  data={allDepartments}
                  withAsterisk
                  clearable
                  searchable
                />
              )}
              <TextInput
                required
                label="Novo email"
                placeholder="hello@mantine.dev"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email}
                radius="md"
              />

              {role === "COORDINATOR" && (
                <Select
                  required
                  label="Escolha um novo curso"
                  placeholder="Escolha um curso"
                  value={`${form.values.courseId}`}
                  onChange={(value) => {
                    if (value) form.setFieldValue("courseId", +value);
                  }}
                  error={form.errors.courseId}
                  className="self-start w-full"
                  data={allCourses}
                  withAsterisk
                  clearable
                  searchable
                />
              )}

              <PasswordInput
                required
                label="Nova Senha"
                placeholder="Digite sua nova senha."
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={form.errors.password}
                radius="md"
              />
              <Textarea
                required
                label="Fale um pouco sobre ti"
                placeholder="Digite sua nova senha."
                value={form.values.bio}
                onChange={(event) =>
                  form.setFieldValue("bio", event.currentTarget.value)
                }
                error={form.errors.bio}
                radius="md"
              />
              <ButtonProgress
                targetButton="Carregar uma nova imagem"
                className="text-center"
              />
              <div className="w-full p-1 flex justify-end items-center gap-3">
                <Button onClick={onCancelFn} variant="outline">
                  Cancelar
                </Button>
                <Button variant="gradient" type="submit">
                  Salvar
                </Button>
              </div>
            </Stack>
          </form>
        </Paper>
      </Modal>

      <Button onClick={open} variant="gradient" className="px-5">
        {targetButton}
      </Button>
    </>
  );
}
