import { ButtonProgress } from "@/components/ButtonProcess";
import RichTextDemo from "@/components/RichText";
import { Button, Group } from "@mantine/core";

export default function Dashboard() {
  return (
    <section className="flex justify-center items-center w-full ">
      <Group className="flex flex-col gap-2">
        <RichTextDemo />
        <div className="flex items-center gap-3">
          <Button variant="primary">Postar</Button>
          <ButtonProgress />
          <Button variant="default">Cancelar</Button>
        </div>
      </Group>
    </section>
  );
}
