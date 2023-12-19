import { WarningLabel } from '@app/components/warning-label';
import i18n from '@app/i18n'
export function PsbtRequestSighashWarningLabel() {
  return (
    <WarningLabel title={i18n.common.requestSighashWarningTitle} width="100%">
        {i18n.common.requestSighashWarning}
    </WarningLabel>
  );
}
