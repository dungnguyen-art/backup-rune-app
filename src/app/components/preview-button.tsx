import { SendCryptoAssetSelectors } from '@tests/selectors/send.selectors';
import { useFormikContext } from 'formik';

import { LeatherButton } from '@app/ui/components/button';
import i18n from '@app/i18n'
interface PreviewButtonProps {
  text?: string;
  isDisabled?: boolean;
}
export function PreviewButton({ text = i18n.button.continue, isDisabled, ...props }: PreviewButtonProps) {
  const { handleSubmit } = useFormikContext();

  return (
    <LeatherButton
      data-testid={SendCryptoAssetSelectors.PreviewSendTxBtn}
      disabled={isDisabled}
      onClick={() => handleSubmit()}
      type="submit"
      {...props}
    >
      {text}
    </LeatherButton>
  );
}
