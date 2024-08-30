import { TModal } from "@/@types";
import {
  ActionIcon,
  Button,
  Menu,
  rem,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";

interface ModalDemoProps {
  targetButton?: string;
  content: string;
  isThisUserCanDelete: boolean;
  trashTarget?: string;
  typeModal: TModal;
  handleClick: () => void;
}

export default function ModalDemoDelete({
  targetButton,
  content,
  isThisUserCanDelete,
  trashTarget,
  typeModal,
  handleClick,
}: ModalDemoProps) {
  const theme = useMantineTheme();

  function onCancelFn() {
    console.log("confirm");
  }
  function onConfirmFn() {
    console.log("cancel");
    handleClick();
  }

  const openModal = () =>
    modals.openConfirmModal({
      title: "Confirma sua acção",
      children: <Text size="sm">{content}</Text>,
      labels: { confirm: "Confirmar", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onCancel: onCancelFn,
      onConfirm: onConfirmFn,
    });

  if (typeModal === "deletePost" && isThisUserCanDelete)
    return (
      <ActionIcon variant="subtle" color="gray" onClick={openModal}>
        <IconTrash
          style={{ width: rem(20), height: rem(20) }}
          color={theme.colors.red[6]}
          stroke={1.5}
        />
      </ActionIcon>
    );

  if (typeModal === "deleteAccount")
    return (
      <Button
        onClick={openModal}
        variant="filled"
        className="px-5 bg-red-600 hover:bg-red-800"
      >
        {targetButton}
      </Button>
    );

  if (typeModal === "deleteComment")
    return (
      <Menu.Item
        onClick={openModal}
        leftSection={
          <IconTrash
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
            color={theme.colors.red[5]}
          />
        }
      >
        {trashTarget}
      </Menu.Item>
    );
}
