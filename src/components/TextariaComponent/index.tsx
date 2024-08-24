import { Textarea } from "@mantine/core";
import CustomButton from "../CustomButton";
interface TextareaComponentProps {
  labelTarget: string;
  errorTarget: string;
  className: string;
  buttonTarget: string;
  classNameButton: string;
  placeholder: string;
}
export default function TextareaComponent({
  errorTarget,
  placeholder,
  className,
  classNameButton,
  buttonTarget,
  labelTarget,
}: TextareaComponentProps) {
  return (
    <div className={className}>
      <Textarea
        mt="md"
        label={labelTarget}
        placeholder={placeholder}
        className={className}
      />
      <div className={classNameButton}>
        <CustomButton
          isDirty={true}
          isPending={false}
          isValid={false}
          handleClick={() => {}}
          target={buttonTarget}
          targetPedding="Postando"
          type="submit"
        />
      </div>
    </div>
  );
}
