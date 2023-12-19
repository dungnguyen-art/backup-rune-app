import { Flex, styled } from 'leather-styles/jsx';

import { BaseDrawer } from '@app/components/drawer/base-drawer';
import { WarningLabel } from '@app/components/warning-label';
import { LeatherButton } from '@app/ui/components/button';
import { BtcIcon } from '@app/ui/components/icons/btc-icon';
import i18n from '@app/i18n'

interface RetrieveTaprootToNativeSegwitLayoutProps {
  isBroadcasting: boolean;
  children: React.ReactNode;
  onClose(): void;
  onApproveTransaction(): void;
}
export function RetrieveTaprootToNativeSegwitLayout(
  props: RetrieveTaprootToNativeSegwitLayoutProps
) {
  const { onClose, onApproveTransaction, isBroadcasting, children } = props;
  return (
    <BaseDrawer isShowing onClose={() => onClose()}>
      <Flex alignItems="start" flexDirection="column" mt="-45px" mx="space.06" textAlign="left">
        <BtcIcon />
        <styled.span mt="space.04" textStyle="label.01">
          {i18n.common.noteRetrieveDeposited}
        </styled.span>
        <styled.span mt="space.05" textStyle="body.02">
          {i18n.common.noteTarootAddress}
        </styled.span>
        <styled.span mt="space.04" textStyle="body.02">
          {i18n.common.noteSupport}
        </styled.span>
        <styled.span mt="space.04" textStyle="body.02">
          {i18n.common.noteDurationTransaction}
        </styled.span>
        {children}
        <WarningLabel mt="space.05">
          {i18n.common.noteUTXO}
        </WarningLabel>
        <LeatherButton
          onClick={onApproveTransaction}
          aria-busy={isBroadcasting}
          width="100%"
          my="space.05"
        >
          {i18n.button.retrieveBitcoin}
        </LeatherButton>
      </Flex>
    </BaseDrawer>
  );
}
