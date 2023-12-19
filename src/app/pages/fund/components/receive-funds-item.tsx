import React from 'react';

import QRCodeIcon from '@assets/images/fund/qr-code-icon.png';
import { FundPageSelectors } from '@tests/selectors/fund.selectors';

import { CryptoCurrencies } from '@shared/models/currencies.model';

import { FundAccountTile } from './fund-account-tile';
import { BitcoinIconComponent, StacksIconComponent } from './icon-components';
import i18n from '@app/i18n'

interface CryptoDescription {
  title: string;
  IconComponent(): React.JSX.Element;
}

const cryptoDescriptions: Record<CryptoCurrencies, CryptoDescription> = {
  STX: {
    title: i18n.common.cryptoDescriptionsSTX,
    IconComponent: StacksIconComponent,
  },
  BTC: {
    title: i18n.common.cryptoDescriptionsBTC,
    IconComponent: BitcoinIconComponent,
  },
};
interface ReceiveStxItemProps {
  onReceive(): void;
  symbol: CryptoCurrencies;
}
export function ReceiveFundsItem({ onReceive, symbol }: ReceiveStxItemProps) {
  return (
    <FundAccountTile
      description={cryptoDescriptions[symbol].title}
      icon={QRCodeIcon}
      onClickTile={onReceive}
      ReceiveStxIcon={cryptoDescriptions[symbol].IconComponent}
      testId={FundPageSelectors.BtnReceiveStx}
    />
  );
}
