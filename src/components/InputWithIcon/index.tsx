import { Dispatch, SetStateAction } from "react";
import { TextInput, Tooltip, Center, Text, rem } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useField } from "@mantine/form";
import { TTypeInput } from "@/@types";

interface InputWithIconProps {
  label: string;
  placeholder: string;
  type: TTypeInput;
  target: string;
  errorMessage: string;
  title: string;
  nameOfDepartament: string;
  className: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setDepartament: Dispatch<SetStateAction<string>>;
}

export default function InputWithIcon({
  label,
  placeholder,
  target,
  className,
  title,
  nameOfDepartament,
  type,
  setDepartament,
  setTitle,
}: InputWithIconProps) {
  function handleChangeValue(value: string) {
    if (type === "title") setTitle(value);
    if (type === "departament") setDepartament(value);
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
      value.trim().length < 6
        ? `${
            type === "title" ? "Titulo" : "Nome do departamento"
          } deve ter mais de seis caracteres`
        : null,
  });

  return (
    <TextInput
      {...field.getInputProps()}
      rightSection={rightSection}
      required
      maxLength={30}
      value={type === "title" ? title : nameOfDepartament}
      label={`${label}`}
      className={`${className}`}
      placeholder={`${placeholder}`}
    />
  );
}
