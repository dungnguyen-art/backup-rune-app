import { ButtonProps, LeatherButton } from '@app/ui/components/button';
import i18n from '@app/i18n'
interface EditNonceButtonProps extends ButtonProps {
  onEditNonce(): void;
}
export function EditNonceButton({ onEditNonce, ...props }: EditNonceButtonProps) {
  return (
    <LeatherButton onClick={onEditNonce} textStyle="label.02" variant="link" {...props}>
      {i18n.button.editNonce}
    </LeatherButton>
  );
}
