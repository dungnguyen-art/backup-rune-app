import { LookingForLedgerLabel } from './looking-for-ledger-label';
import { LedgerSuccessLabel } from './success-label';
import i18n from '@app/i18n'
interface DeviceOperationApprovalStatusProps {
  status: 'awaiting-approval' | 'approved';
}
export function DeviceOperationApprovalStatus({ status }: DeviceOperationApprovalStatusProps) {
  if (status === 'awaiting-approval')
    return <LookingForLedgerLabel my="space.06">{i18n.common.waitingApproval}</LookingForLedgerLabel>;

  return <LedgerSuccessLabel my="space.06">{i18n.common.approved}</LedgerSuccessLabel>;
}
