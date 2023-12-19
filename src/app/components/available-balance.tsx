import { Box, Flex, HStack, styled } from 'leather-styles/jsx';

import { Money } from '@shared/models/money.model';

import { formatMoney } from '@app/common/money/format-money';
import { Tooltip } from '@app/components/tooltip';
import { InfoIcon } from '@app/ui/components/icons/info-icon';
import i18n from '@app/i18n'

export function AvailableBalance(props: { balance: Money; balanceTooltipLabel?: string }) {
  const {
    balance,
    balanceTooltipLabel = i18n.common.balanceTooltipLabel,
  } = props;

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <HStack gap="space.01">
        <styled.span color="accent.text-subdued" textStyle="caption.01">
          {i18n.common.availableBalance}
        </styled.span>
        <Tooltip label={balanceTooltipLabel} placement="top">
          <Box>
            <InfoIcon color="accent.text-subdued" size="xs" />
          </Box>
        </Tooltip>
      </HStack>
      <styled.span color="accent.text-subdued" mr="space.02" textStyle="caption.01">
        {formatMoney(balance)}
      </styled.span>
    </Flex>
  );
}
