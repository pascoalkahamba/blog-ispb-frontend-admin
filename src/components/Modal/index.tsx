import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

interface ModalDemoProps {
  title: string;
}

export function ModalDemo({ title }: ModalDemoProps) {
  const openModal = () =>
    modals.openConfirmModal({
      title: "Confirma sua acção",

      children: (
        <Text size="sm">
          Tem certesa que deseja mesmo eliminar sua conta está acção irá
          eliminar permantemente a sua conta da vitrine online.
        </Text>
      ),
      labels: { confirm: "Confirmar", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  return (
    <Button
      onClick={openModal}
      variant="filled"
      className="px-5 bg-red-600 hover:bg-red-800"
    >
      {title}
    </Button>
  );
}
