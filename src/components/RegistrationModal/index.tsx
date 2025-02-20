"use client";

import { useState, useMemo } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Stack,
  ActionIcon,
  Text,
  Card,
  Badge,
  Input,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash, IconPlus, IconSearch } from "@tabler/icons-react";
import { registrationSchema } from "@/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCodeStudent,
  deleteCodeStudent,
  getAllCodeStudent,
  updateCodeStudent,
} from "@/server";
import {
  ICreateCodeStudent,
  IUpdateCodeStudent,
  IUser,
  IVerificationCodeStudent,
} from "@/interfaces";
import { create } from "domain";

// Schema for validation

// Types
type Registration = {
  id: string;
  registrationNumber: string;
};

interface RegistrationModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function RegistrationModal({
  opened,
  onClose,
}: RegistrationModalProps) {
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRegistration, setSelectedRegistration] =
    useState<IVerificationCodeStudent | null>(null);

  // Form handling
  const form = useForm({
    initialValues: {
      registrationNumber: "",
    },
    validate: zodResolver(registrationSchema),
  });

  const {
    data: registrations,
    isPending,
    error,
  } = useQuery({
    queryKey: ["allRegistrations"],
    queryFn: getAllCodeStudent,
  });
  const queryClient = useQueryClient();

  const {
    mutate: mutateCreateRegistration,
    isPending: isPendingCreateRegistration,
  } = useMutation({
    mutationFn: (values: ICreateCodeStudent) => createCodeStudent(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allRegistrations"] });
      notifications.show({
        title: "Criação do numero de matricula do estudante",
        message: "Numero de matricula do estudante criado com sucesso.",
        color: "green",
        position: "top-right",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Criação do numero de matricula do estudante",
        message: "Numero de matricula do estudante não foi criado.",
        color: "red",
        position: "top-right",
      });
    },
  });

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") as string
  ) as IUser;
  const {
    mutate: mutateUpdateRegistration,
    isPending: isPendingUpdateRegistration,
  } = useMutation({
    mutationFn: (values: IUpdateCodeStudent) => updateCodeStudent(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allRegistrations"] });
      notifications.show({
        title: "Edição do numero de matricula do estudante",
        message: "Numero de matricula do estudante editado com sucesso.",
        color: "green",
        position: "top-right",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Edição do numero de matricula do estudante",
        message: "Erro ao criar numero de matricula do estudante",
        color: "red",
        position: "top-right",
      });
    },
  });

  const { mutate: mutateDeleteRegistration } = useMutation({
    mutationFn: (id: number) => deleteCodeStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allRegistrations"] });
      notifications.show({
        title: "Exclusão do numero de matricula do estudante",
        message: "Numero de matricula do estudante excluido com sucesso.",
        color: "green",
        position: "top-right",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Exclusão do numero de matricula do estudante",
        message: "Erro ao excluir numero de matricula do estudante",
        color: "red",
        position: "top-right",
      });
    },
  });

  // Filtered registrations based on search
  const filteredRegistrations = useMemo(() => {
    return registrations?.filter((reg) =>
      reg.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [registrations, search]);

  if (error)
    return (
      <p className="font-bold text-center">
        Algo deu errado tente novamente: Numero de matricula não encontrado
      </p>
    );

  const handleSubmit = (values: typeof form.values) => {
    if (isEditing && selectedRegistration) {
      // Update existing registration
      mutateUpdateRegistration({
        id: +selectedRegistration.id,
        codeForStudent: values.registrationNumber,
      });
    } else {
      // Check if registration number already exists

      // Add new registration
      mutateCreateRegistration({
        code: values.registrationNumber,
        email: currentUser.email,
      });
    }
    resetForm();
  };

  const handleEdit = (registration: IVerificationCodeStudent) => {
    setSelectedRegistration(registration);
    setIsEditing(true);
    form.setValues({
      registrationNumber: registration.code,
    });
  };

  const handleDelete = (registrationId: string) => {
    mutateDeleteRegistration(+registrationId);
  };

  const resetForm = () => {
    form.reset();
    setIsEditing(false);
    setSelectedRegistration(null);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        onClose();
        resetForm();
        setSearch("");
      }}
      title="Todos numeros de matricula dos estudantes"
      size="xl"
    >
      <Stack spacing="md">
        {/* Search Section */}
        <Input
          placeholder="Pesquisa pelo numero de matricula"
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />

        {/* Form Section */}
        <Card withBorder>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack spacing="sm">
              <TextInput
                label="Numero de matricula"
                placeholder="Digite o numero de matricula"
                required
                {...form.getInputProps("registrationNumber")}
              />

              <Group justify="flex-end">
                {isEditing && (
                  <Button variant="light" color="gray" onClick={resetForm}>
                    Cancelar
                  </Button>
                )}
                <Button
                  loading={
                    isPendingCreateRegistration || isPendingUpdateRegistration
                  }
                  type="submit"
                  leftSection={<IconPlus size={16} />}
                >
                  {isEditing ? "Atualizar" : "Adicionar"}
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>

        {/* List Section */}
        <Stack spacing="sm">
          {isPending ? (
            <div className="w-full flex justify-center items-center">
              Carregando...
            </div>
          ) : filteredRegistrations?.length === 0 ? (
            <Text c="dimmed" ta="center">
              Não há numeros de matriculas para exibir.
            </Text>
          ) : (
            filteredRegistrations?.map((registration) => (
              <Card key={registration.id} withBorder>
                <Group justify="space-between" align="flex-start">
                  <Stack spacing="xs">
                    <Group>
                      <Badge color="blue">{registration.code}</Badge>
                      <Badge color="green">Ativo</Badge>
                    </Group>
                  </Stack>
                  <Group>
                    <ActionIcon
                      variant="light"
                      color="blue"
                      onClick={() => handleEdit(registration)}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      color="red"
                      onClick={() => handleDelete(registration.id)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Group>
              </Card>
            ))
          )}
        </Stack>
      </Stack>
    </Modal>
  );
}
