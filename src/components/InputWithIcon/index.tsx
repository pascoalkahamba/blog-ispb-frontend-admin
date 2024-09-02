import { Dispatch, SetStateAction } from "react";
import { TextInput, Tooltip, Center, Text, rem } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useField } from "@mantine/form";
import { TTypeInput } from "@/@types";

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
  title,
  setTitle,
}: InputWithIconProps) {
  function handleChangeValue(value: string) {
    setTitle(value);
  }
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

  const field = useField({
    initialValue: "",
    onValueChange: (value) => {
      handleChangeValue(value);
    },
    validateOnBlur: true,
    validate: (value) =>
      value.trim().length < 6 && "Titulo de ter mais de seis caracteres.",
  });

  return (
    <TextInput
      {...field.getInputProps()}
      rightSection={rightSection}
      required
      maxLength={30}
      value={title}
      label={`${label}`}
      className={`${className}`}
      placeholder={`${placeholder}`}
    />
  );
}
