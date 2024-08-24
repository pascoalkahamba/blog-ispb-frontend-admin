import {
  Button,
  Menu,
  Group,
  ActionIcon,
  rem,
  useMantineTheme,
} from "@mantine/core";
import {
  IconTrash,
  IconThumbUp,
  IconThumbDown,
  IconPencilMinus,
  IconGripVertical,
  IconChevronDown,
} from "@tabler/icons-react";
import classes from "@/components/SplitButton/styles.module.css";

interface SplitButtonProps {
  trashTarget: string;
  editTarget: string;
}

export function SplitButton({ trashTarget, editTarget }: SplitButtonProps) {
  const theme = useMantineTheme();

  return (
    <Group wrap="nowrap" gap={0}>
      <Menu
        transitionProps={{ transition: "pop" }}
        position="bottom-end"
        withinPortal
      >
        <Menu.Target>
          <ActionIcon
            color={theme.primaryColor}
            size={36}
            className={`${classes.menuControl} bg-transparent hover:bg-slate-800`}
          >
            <IconGripVertical
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconPencilMinus
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                color={theme.colors.yellow[5]}
              />
            }
          >
            {editTarget}
          </Menu.Item>
          <Menu.Item
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
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
