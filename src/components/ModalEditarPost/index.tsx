import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

export default function ModalEditPost() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        {/* Modal content */}
      </Modal>

      <Button onClick={open}>Open centered Modal</Button>
    </>
  );
}
