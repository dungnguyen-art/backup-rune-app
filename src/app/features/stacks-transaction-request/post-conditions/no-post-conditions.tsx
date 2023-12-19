import { Box, Circle, HStack } from 'leather-styles/jsx';
import { styled } from 'leather-styles/jsx';

import { LockIcon } from '@app/ui/components/icons/lock-icon';
import i18n from '@app/i18n'

export function NoPostConditions(): React.JSX.Element {
  return (
    <HStack alignItems="center" gap="space.04" p="space.04">
      <Circle bg="accent.component-background-hover" flexShrink={0}>
        <LockIcon />
      </Circle>
      <Box flexGrow={1}>
        <styled.span textStyle="body.02">
            {i18n.common.noPostConditions}
        </styled.span>
      </Box>
    </HStack>
  );
}
