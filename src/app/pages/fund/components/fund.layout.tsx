import { Flex, Stack, styled } from 'leather-styles/jsx';

import { CryptoCurrencies } from '@shared/models/currencies.model';

import { HasChildren } from '@app/common/has-children';

import i18n from '@app/i18n'
const nameMap: Record<CryptoCurrencies, { name: string; symbol: string }> = {
  BTC: {
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  STX: {
    name: 'Stacks',
    symbol: 'STX',
  },
};

interface FundLayoutProps extends HasChildren {
  symbol: CryptoCurrencies;
}

export function FundLayout({ symbol, children }: FundLayoutProps) {
  const name = nameMap[symbol].name;
  const nameAbbr = nameMap[symbol].symbol;
  return (
    <Flex
      alignItems={['left', 'center']}
      flexGrow={1}
      flexDirection="column"
      minHeight={['70vh', '90vh']}
      justifyContent="start"
      mb="space.05"
    >
      <Stack
        alignItems={['left', 'center']}
        pb={['space.04', 'unset']}
        px={['space.05', 'space.05', 'unset']}
        gap={['space.04', 'space.05']}
      >
        <styled.h1
          px={['unset', 'space.05']}
          textAlign={['left', 'center']}
          textStyle={['heading.03', 'heading.02']}
        >
          {i18n.screen["buyAsset-chooseAsset.getFund"]}
        </styled.h1>

        <styled.span
          textStyle="body.01"
          color="accent.text-subdued"
          maxWidth="544px"
          textAlign={['left', 'center']}
        >
          {i18n.formatString(i18n.screen["buyAsset-chooseAsset.brief"], {
            name: name,
            nameAbbr: nameAbbr
          })}
        </styled.span>
      </Stack>
      {children}
    </Flex>
  );
}
