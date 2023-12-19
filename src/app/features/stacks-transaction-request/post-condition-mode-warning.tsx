import { PostConditionMode } from '@stacks/transactions';

import { WarningLabel } from '@app/components/warning-label';
import { usePostConditionModeState } from '@app/store/transactions/post-conditions.hooks';
import i18n from '@app/i18n'
export function PostConditionModeWarning(): React.JSX.Element | null {
  const mode = usePostConditionModeState();

  if (mode !== PostConditionMode.Allow) return null;

  return (
    <WarningLabel mb="space.05" title="This transaction is not secure" width="100%">
      {i18n.common.modeWarning}
    </WarningLabel>
  );
}
