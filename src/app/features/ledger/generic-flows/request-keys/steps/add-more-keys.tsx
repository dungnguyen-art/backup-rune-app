import { useNavigate } from 'react-router-dom';

import { Stack } from 'leather-styles/jsx';

import { LedgerTitle } from '@app/features/ledger/components/ledger-title';
import { LedgerWrapper } from '@app/features/ledger/components/ledger-wrapper';
import { LeatherButton } from '@app/ui/components/button';
import { Caption } from '@app/ui/components/typography/caption';
import { Capitalize } from '@app/ui/utils/capitalize';

import { useLedgerRequestKeysContext } from '../ledger-request-keys.context';
import i18n from "@app/i18n";

export function AddMoreKeysLayout() {
  const navigate = useNavigate();

  const { chain } = useLedgerRequestKeysContext();

  const addKeysChain = chain === 'stacks' ? 'bitcoin' : 'stacks';

  return (
    <LedgerWrapper gap="space.05">
      <LedgerTitle mb="space.05">
        <Capitalize>{chain}</Capitalize> connected successfully. Would you like to connect{' '}
        <Capitalize>{addKeysChain}</Capitalize>?
      </LedgerTitle>
      <Stack gap="space.04" mb="space.04">
        <LeatherButton onClick={() => navigate(`/get-started/${addKeysChain}/connect-your-ledger`)}>
          Connect <Capitalize>{addKeysChain}</Capitalize>
        </LeatherButton>
        <LeatherButton variant="outline" onClick={() => navigate('/')}>
            {i18n.button["addMoreKey.continueToLeather"]}
        </LeatherButton>
      </Stack>

      <Caption>
        You'll need to have the <Capitalize>{addKeysChain}</Capitalize> app installed and opened
      </Caption>
    </LedgerWrapper>
  );
}

//i18n-variable
