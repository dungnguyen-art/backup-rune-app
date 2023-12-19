import { Box, Flex, styled } from 'leather-styles/jsx';

import { Tooltip } from '@app/components/tooltip';
import { InfoIcon } from '@app/ui/components/icons/info-icon';
import i18n from '@app/i18n'
const defaultPendingWaitingMessage = i18n.common.defaultPendingWaitingMessage;
interface PendingLabelProps {
  pendingWaitingMessage?: string;
}

export function PendingLabel({
  pendingWaitingMessage = defaultPendingWaitingMessage,
}: PendingLabelProps) {
  return (
    <Flex alignItems="center">
      <styled.span color="warning.label" mr="space.01" textStyle="label.03">
        {i18n.common.transactionStatusPending}
      </styled.span>
      <Tooltip label={pendingWaitingMessage} placement="bottom">
        <Box>
          <InfoIcon color="warning.label" size="xs" />
        </Box>
      </Tooltip>
    </Flex>
  );
}
