import { memo } from 'react';

import { Box, Flex, styled } from 'leather-styles/jsx';
import i18n from '@app/i18n'
export const AccountListUnavailable = memo(() => (
  <Flex
    flexDirection="column"
    justifyContent="center"
    minHeight="120px"
    mb="space.06"
    px="space.05"
  >
    <Box>
      <styled.span textStyle="label.01">Unable to load account information</styled.span>
      <styled.span mt="space.03" textStyle="body.02">
        {i18n.common.accountListUnavailable}
      </styled.span>
    </Box>
  </Flex>
));
