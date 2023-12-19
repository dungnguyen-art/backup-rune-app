import { useState } from 'react';

import { WarningLabel } from '@app/components/warning-label';
import { useOnOriginTabClose } from '@app/routes/hooks/use-on-tab-closed';
import i18n from 'app/i18n'

export function RequestingTabClosedWarningMessage() {
  const [hasTabClosed, setHasTabClosed] = useState(false);

  useOnOriginTabClose(() => {
    setHasTabClosed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (!hasTabClosed) return null;

  return (
    <WarningLabel mb="space.05" title={i18n.common.requestingWindownClosed} width="100%">
      {i18n.common.requestingWindownClosedMsg}
    </WarningLabel>
  );
}
