import { TTypeButton } from "@/@types";
import { Button, MantineRadius, MantineSize } from "@mantine/core";

interface CustomButtonProps {
  handleClick?: () => void;
  isPending: boolean;
  targetPedding: string;
  radius?: MantineRadius;
  size?: MantineSize;
  target: string;
  isDirty: boolean;
  isValid: boolean;
  type: TTypeButton;
}

export default function CustomButton({
  handleClick,
  isPending,
  type,
  target,
  size,
  radius,
  targetPedding,
}: CustomButtonProps) {
  return (
    <Button
      type={type}
      variant="primary"
      radius={radius}
      size={size}
      loading={isPending}
      onClick={handleClick}
      disabled={isPending}
      className={`${isPending && "bg-blue-400 text-white"}`}
    >
      {target}
    </Button>
  );
}
