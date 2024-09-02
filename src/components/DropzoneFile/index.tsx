import { useEffect, useRef } from "react";
import { Text, Group, Button, rem, useMantineTheme } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";
import classes from "@/components/DropzoneFile/styles.module.css";
import { useAtom, useSetAtom } from "jotai";
import { dropzoneAtom, selectFileAtom } from "@/storage/atom";

export function DropzoneFile() {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [selectFile, setSelectFile] = useAtom(selectFileAtom);
  const setDropzone = useSetAtom(dropzoneAtom);

  useEffect(() => {
    if (selectFile) {
      setDropzone((dropzone) => !dropzone);
    }
  }, [selectFile, setDropzone]);

  function closeDropzone() {
    setSelectFile("");
    setDropzone(false);
  }

  return (
    <div
      className={classes.wrapper}
      data-aos="zoom-in-up"
      data-aos-duration="1400"
      onClick={closeDropzone}
    >
      <div onClick={(event) => event.stopPropagation()}>
        <Dropzone
          openRef={openRef}
          itemType="file"
          name="file"
          onDrop={(files) => {
            if (files) {
              setSelectFile(files[0]);
              console.log("dropzone", selectFile);
            }
          }}
          className={classes.dropzone}
          radius="md"
          accept={[MIME_TYPES.jpeg]}
          maxSize={5 * 1024 * 1024}
        >
          <div style={{ pointerEvents: "none" }}>
            <Group justify="center">
              <Dropzone.Accept>
                <IconDownload
                  style={{ width: rem(50), height: rem(50) }}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{ width: rem(50), height: rem(50) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload
                  style={{ width: rem(50), height: rem(50) }}
                  stroke={1.5}
                />
              </Dropzone.Idle>
            </Group>

            <Text ta="center" fw={700} fz="lg" mt="xl">
              <Dropzone.Accept>Carrega aqui a imagem</Dropzone.Accept>
              <Dropzone.Reject>Apenas arquivos menos de 30mb</Dropzone.Reject>
              <Dropzone.Idle>Carrega a imagem</Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              Carrega aqui sua imagem apenas imagem do tipo <i>jpg</i> e{" "}
              <i>png</i> imagem <i>pdf</i>.
            </Text>
          </div>
        </Dropzone>

        <Button
          className={classes.control}
          size="md"
          name="file"
          radius="xl"
          onClick={() => openRef.current?.()}
        >
          Selecione a imagem
        </Button>
      </div>
    </div>
  );
}
