import { hexToHumanReadable } from '@app/common/utils';
import { useTransactionRequestState } from '@app/store/transactions/requests.hooks';

import { Row } from './row';
import i18n from '@app/i18n'
export function AttachmentRow(): React.JSX.Element | null {
  const pendingTransaction = useTransactionRequestState();
  return pendingTransaction?.attachment ? (
    <Row name={i18n.common.attachment} value={hexToHumanReadable(pendingTransaction.attachment)} />
  ) : null;
}
