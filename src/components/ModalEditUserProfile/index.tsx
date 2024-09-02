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
  Text,
  TextInput,
  useMantineTheme,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { ButtonProgress } from "@/components/ButtonProcess";
import { IAdminUpdateProfile } from "@/interfaces";
import { zodResolver } from "mantine-form-zod-resolver";
import { updateProfileSchema } from "@/schemas";

interface ModalDemoProps {
  targetButton: string;
  content: string;
  isThisUserCanDelete: boolean;
  title: string;
  editorUser: TRole;
  handleClick: () => void;
}

export default function ModalEditUserProfile({
  targetButton,
  content,
  isThisUserCanDelete,
  typeModal,
  title,
  handleClick,
}: ModalDemoProps) {
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      contact: "324",
      password: "",
      bio: "",
    },
    validate: zodResolver(updateProfileSchema),
  });

  function handleEditProfile(values: IAdminUpdateProfile) {
    console.log("accepted", values);
  }
  function onCancelFn() {
    modals.closeAll();
    console.log("confirm");
  }
  function onConfirmFn() {
    console.log("cancel");
    modals.closeAll();
    handleClick();
  }

  const openModal = () =>
    modals.openConfirmModal({
      title: `${title}`,
      size: "xl",
      children: (
        <>
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
                  radius="md"
                />

                <TextInput
                  required
                  type="number"
                  label="Novo número"
                  placeholder="Digite seu novo numero"
                  value={form.values.username}
                  onChange={(event) =>
                    form.setFieldValue("username", event.currentTarget.value)
                  }
                  radius="md"
                />

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
                  <Button
                    onClick={onConfirmFn}
                    variant="gradient"
                    type="submit"
                  >
                    Salvar
                  </Button>
                </div>
              </Stack>
            </form>
          </Paper>
        </>
      ),
    });

  return (
    <Button onClick={openModal} variant="gradient" className="px-5">
      {targetButton}
    </Button>
  );
}
