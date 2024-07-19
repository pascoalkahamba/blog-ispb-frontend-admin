import { Container } from "@mantine/core";
import classes from "./styles.module.css";

export function AuthFooter() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <p className="italic">
          Universidade ISPB - © Todos os direitos reservados
        </p>
      </Container>
    </div>
  );
}
