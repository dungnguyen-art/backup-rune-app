import { Box, Flex, Stack, styled } from 'leather-styles/jsx';

import { capitalize } from '@app/common/utils';
import { ErrorLabel } from '@app/components/error-label';
import { ExternalLink } from '@app/components/external-link';
import { WarningLabel } from '@app/components/warning-label';
import { ConnectLedgerErr } from '@app/features/ledger/illustrations/ledger-illu-connect-ledger-error';
import { LeatherButton } from '@app/ui/components/button';
import { CircleIcon } from '@app/ui/components/icons/circle-icon';
import { Caption } from '@app/ui/components/typography/caption';

import { LedgerTitle } from '../../components/ledger-title';
import { LedgerWrapper } from '../../components/ledger-wrapper';
import { useLedgerRequestKeysContext } from '../../generic-flows/request-keys/ledger-request-keys.context';
import i18n from '@app/i18n'

interface PossibleReasonUnableToConnectProps {
  text: string;
}
function PossibleReasonUnableToConnect(props: PossibleReasonUnableToConnectProps) {
  const { text } = props;

  return (
    <Flex alignItems="center">
      <Box mr="space.02">
        <CircleIcon fill="accent.text-primary" size="4px" />
      </Box>
      <styled.span textStyle="body.02">{text}</styled.span>
    </Flex>
  );
}

interface ConnectLedgerErrorLayoutProps {
  warningText: string | null;
  onCancelConnectLedger(): void;
  onTryAgain(): void;
}
export function ConnectLedgerErrorLayout(props: ConnectLedgerErrorLayoutProps) {
  const { warningText, onTryAgain } = props;
  const { chain } = useLedgerRequestKeysContext();

  return (
    <LedgerWrapper px="space.07">
      <Box mt="space.02">
        <ConnectLedgerErr />
      </Box>
      <LedgerTitle mt="space.07">{i18n.errorMessages["connectLedferError.title"]}</LedgerTitle>
      {warningText ? (
        <WarningLabel mt="space.04" px="space.06" fontSize="14px">
          {warningText}
        </WarningLabel>
      ) : (
        <ErrorLabel mt="space.02">{i18n.errorMessages.unableToConnect}</ErrorLabel>
      )}
      <Stack borderRadius="md" gap="space.01" textAlign="left" py="space.05">
        <PossibleReasonUnableToConnect text="Check if Ledger Live is open. Close it and try again" />
        <PossibleReasonUnableToConnect text="Ensure you only have one instance of Leather open" />
        <PossibleReasonUnableToConnect
          text={`Verify the ${capitalize(chain)} app is installed and open`}
        />
        <PossibleReasonUnableToConnect text="Check you've approved the browser USB pop up" />
      </Stack>
      <LeatherButton width="100%" onClick={onTryAgain}>
          {i18n.button.tryAgain}
      </LeatherButton>
      <Caption mt="space.05">
          {i18n.common["connectLedger.caption"]}{' '}
        <ExternalLink
          textDecoration="underline"
          href="https://leather.gitbook.io/guides/securing-the-wallet/using-ledger-with-leather"
        >
            {i18n.common["connectLedger.externalLink"]}
        </ExternalLink>
      </Caption>
    </LedgerWrapper>
  );
}
