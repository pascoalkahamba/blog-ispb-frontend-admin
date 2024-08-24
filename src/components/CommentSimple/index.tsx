"use client";

import {
  Text,
  Avatar,
  Group,
  Divider,
  ActionIcon,
  useMantineTheme,
  rem,
  Button,
} from "@mantine/core";
import ReplySimple from "@/components/ReplySimple";
import { SplitButton } from "../SplitButton";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { useState } from "react";
import TextareaComponent from "../TextariaComponent";

export default function CommentSimple() {
  const [seeReply, setSeeReply] = useState(false);
  const theme = useMantineTheme();
  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <Group className="w-full flex gap-3 items-center">
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            alt="Jacob Warnhalter"
            radius="xl"
            className="block"
          />
          <div>
            <Text size="sm">Jacob Warnhalter</Text>
            <Text size="xs" c="dimmed">
              10 minutes ago
            </Text>
          </div>
        </Group>
        <SplitButton
          editTarget="Editar Comentario"
          trashTarget="Excluir Comentario"
        />
      </div>
      <Text pl={54} pt="sm" size="sm" mb={3}>
        This Pokémon likes to lick its palms that are sweetened by being soaked
        in honey. Teddiursa concocts its own honey by blending fruits and pollen
        collected by Beedrill. Blastoise has water spouts that protrude from its
        shell. The water spouts are very accurate.
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
        <Button
          className="text-xs font-bold ml-2"
          variant="transparent"
          onClick={() => setSeeReply(!seeReply)}
        >
          {seeReply ? "Não respontar mais" : "Responder"}
        </Button>
      </Group>
      {seeReply && (
        <TextareaComponent
          labelTarget="Responder"
          buttonTarget="Responder"
          placeholder="Escreva sua resposta"
          errorTarget="Resposta invalida"
          className="w-[90%] ml-10 flex flex-col gap-3"
          classNameButton="ml-10"
        />
      )}

      {/* <Divider size="xs" className="mx-[-5rem]" /> */}

      <ReplySimple />
    </div>
  );
}
