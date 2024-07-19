"use-client";

import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "./styles.module.css";
import Link from "next/link";

export function AuthForgotPassword() {
  return (
    <Container
      size={460}
      my={30}
      className="flex justify-center flex-col w-[60%]"
    >
      <Title className={classes.title} ta="center">
        Esqueceu sua senha?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Digite seu email para recuperar sua conta
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl" className="w-66">
        <TextInput
          label="Seu email"
          placeholder="pascoalkahamba25@gmail.com"
          required
        />
        <Group justify="space-between" mt="lg" className={classes.controls}>
          <Anchor c="dimmed" size="sm" className={classes.control}>
            <Center inline>
              <IconArrowLeft
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
              <Link href="/signin">
                <Box ml={5} className=" text-xs italic hover:underline">
                  {" "}
                  Voltar para página de login
                </Box>
              </Link>
            </Center>
          </Anchor>
          <Button className={classes.control}>Recupera sua senha</Button>
        </Group>
      </Paper>
    </Container>
  );
}
