import {
  Text,
  Avatar,
  Group,
  Divider,
  ActionIcon,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { SplitButton } from "../SplitButton";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";

export default function ReplySimple() {
  const theme = useMantineTheme();
  return (
    <div className="ml-12 mt-2 mr-12 flex justify-center items-center gap-3">
      <Divider orientation="vertical" size="xs" className="h-22" />
      <div>
        <div className="w-full flex justify-between items-center">
          <Group>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
              alt="Jacob Warnhalter"
              radius="xl"
            />
            <div>
              <Text size="sm">Jacob Warnhalter</Text>
              <Text size="xs" c="dimmed">
                10 minutes ago
              </Text>
            </div>
          </Group>
          <SplitButton
            commentId={null}
            content=""
            replyId={4}
            editTarget="Editar Resposta"
            trashTarget="Excluir Resposta"
          />
        </div>
        <Text pl={54} pt="sm" size="sm" mb={5}>
          This Pokémon likes to lick its palms that are sweetened by being
          soaked in honey. Teddiursa concocts its own honey by blending fruits
          and pollen collected by Beedrill. Blastoise has water spouts that
          protrude from its shell. The water spouts are very accurate.
        </Text>
        <Group gap={2} className="ml-14">
          <ActionIcon variant="subtle" color="blue">
            <IconThumbUp
              style={{ width: rem(20), height: rem(20) }}
              color={theme.colors.blue[6]}
              stroke={1.5}
            />
          </ActionIcon>
          <span className="text-xs italic">{20}</span>

          <ActionIcon variant="subtle" color="red">
            <IconThumbDown
              style={{ width: rem(20), height: rem(20) }}
              color={theme.colors.red[6]}
              stroke={1.5}
            />
          </ActionIcon>
          <span className="text-xs italic">{30}</span>
        </Group>

        <Divider size="xs" className="mx-[-5rem]" />
      </div>
    </div>
  );
}
