import { RecipientField } from '@app/pages/send/send-crypto-asset-form/components/recipient-field';
import i18n from '@app/i18n'
interface RecipientFieldAddressProps {
  isSelectVisible: boolean;
  onClickLabelAction(): void;
  selectedRecipientField: number;
  topInputOverlay: React.JSX.Element;
}
export function RecipientFieldAddress({
  isSelectVisible,
  onClickLabelAction,
  topInputOverlay,
}: RecipientFieldAddressProps) {
  return (
    <RecipientField
      isDisabled={isSelectVisible}
      labelAction={i18n.common.selectAccount}
      name="recipient"
      onClickLabelAction={onClickLabelAction}
      placeholder={i18n.common.recipientAddressPlaceHolder}
      topInputOverlay={topInputOverlay}
    />
  );
}
