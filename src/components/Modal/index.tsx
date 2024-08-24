import { TModal } from "@/@types";
import { ActionIcon, Button, rem, Text, useMantineTheme } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";

interface ModalDemoProps {
  targetButton: string;
  content: string;
  typeModal: TModal;
  handleClick: () => void;
}

export function ModalDemo({
  targetButton,
  content,
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

  if (typeModal === "deletePost")
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
}
