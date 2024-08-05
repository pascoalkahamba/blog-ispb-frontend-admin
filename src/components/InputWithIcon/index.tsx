import { Dispatch, SetStateAction } from "react";
import { TextInput, Tooltip, Center, Text, rem } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

interface InputWithIconProps {
  label: string;
  placeholder: string;
  target: string;
  errorMessage: string;
  title: string;
  className: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

export default function InputWithIcon({
  label,
  placeholder,
  target,
  className,
  errorMessage,
  setTitle,
  title,
}: InputWithIconProps) {
  const rightSection = (
    <Tooltip
      label={`${target}`}
      position="top-end"
      withArrow
      transitionProps={{ transition: "pop-bottom-right" }}
    >
      <Text component="div" c="dimmed" style={{ cursor: "help" }}>
        <Center>
          <IconInfoCircle
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        </Center>
      </Text>
    </Tooltip>
  );

  return (
    <TextInput
      rightSection={rightSection}
      required
      label={`${label}`}
      value={title}
      error={!title && errorMessage}
      className={`${className}`}
      placeholder={`${placeholder}`}
      onChange={(event) => setTitle(event.target.value)}
    />
  );
}
