"use client";
import { useState } from "react";
import { useInterval } from "@mantine/hooks";
import { Button, Progress, useMantineTheme, rgba } from "@mantine/core";
import classes from "@/components/ButtonProcess/styles.module.css";
import { useAtom } from "jotai";
import { dropzoneAtom } from "@/storage/atom";
import { DropzoneFile } from "../DropzoneFile";

export function ButtonProgress() {
  const theme = useMantineTheme();
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [dropzone, setDropzone] = useAtom(dropzoneAtom);

  const interval = useInterval(
    () =>
      setProgress((current) => {
        if (current < 100) {
          return current + 1;
        }

        interval.stop();
        setLoaded(true);
        return 0;
      }),
    20
  );

  function chooseFile() {
    setDropzone(true);

    !dropzone && loaded
      ? setLoaded(false)
      : !interval.active && interval.start();
  }

  return (
    <section>
      <Button
        className={classes.button}
        onClick={chooseFile}
        onBlur={() => setDropzone(false)}
        color={loaded ? "teal" : theme.primaryColor}
      >
        <div className={classes.label}>
          {progress !== 0
            ? "Carregando ficheiro"
            : loaded
            ? "Ficheiro carregado"
            : "Carregar ficheiro"}
        </div>
        {progress !== 0 && (
          <Progress
            value={progress}
            className={classes.progress}
            color={rgba(theme.colors.blue[2], 0.35)}
            radius="sm"
          />
        )}
      </Button>
      {dropzone && <DropzoneFile />}
    </section>
  );
}
