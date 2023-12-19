import { HStack } from 'leather-styles/jsx';

import { useWalletType } from '@app/common/use-wallet-type';
import { LeatherButton } from '@app/ui/components/button';
import i18n from '@app/i18n'
interface StacksSignMessageActionsProps {
  onSignMessage(): void;
  onSignMessageCancel(): void;
  isLoading: boolean;
}
export function SignMessageActions(props: StacksSignMessageActionsProps) {
  const { onSignMessage, onSignMessageCancel, isLoading } = props;
  const { whenWallet } = useWalletType();

  return (
    <HStack gap="space.04">
      <LeatherButton onClick={onSignMessageCancel} variant="outline" width="50%">
          {i18n.button.cancel}
      </LeatherButton>
      <LeatherButton aria-busy={isLoading} onClick={onSignMessage} width="50%">
        {whenWallet({ software: 'Sign', ledger: 'Sign on Ledger' })}
      </LeatherButton>
    </HStack>
  );
}
