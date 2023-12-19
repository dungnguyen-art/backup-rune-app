import { useNavigate } from 'react-router-dom';

import { Box, Flex, HStack, Stack } from 'leather-styles/jsx';

import { RouteUrls } from '@shared/route-urls';
import { noop } from '@shared/utils';

import { CaptionDotSeparator } from '@app/components/caption-dot-separator';
import { usePressable } from '@app/components/item-hover';
import { Flag } from '@app/components/layout/flag';
import { StatusPending } from '@app/components/status-pending';
import { StatusReady } from '@app/components/status-ready';
import { Tooltip } from '@app/components/tooltip';
import { useNativeSegwitBalance } from '@app/query/bitcoin/balance/btc-native-segwit-balance.hooks';
import { useCheckOrderStatuses } from '@app/query/bitcoin/ordinals/brc20/use-check-order-status';
import { fetchInscripionById } from '@app/query/bitcoin/ordinals/inscription-by-id.query';
import { convertInscriptionToSupportedInscriptionType } from '@app/query/bitcoin/ordinals/inscription.hooks';
import { useOrdinalsbotClient } from '@app/query/bitcoin/ordinalsbot-client';
import { useCurrentAccountNativeSegwitAddressIndexZero } from '@app/store/accounts/blockchain/bitcoin/native-segwit-account.hooks';
import {
  OrdinalsbotInscriptionStatus,
  PendingBrc20Transfer,
  usePendingBrc20Transfers,
} from '@app/store/ordinals/ordinals.slice';
import { Caption } from '@app/ui/components/typography/caption';
import i18n from '@app/i18n'

function StatusIcon({ status }: { status: OrdinalsbotInscriptionStatus }) {
  switch (status) {
    case 'pending':
      return <StatusPending />;
    case 'paid':
      return <StatusPending />;
    case 'waiting-for-indexer':
      return <StatusPending />;
    case 'ready':
      return <StatusReady />;
    default:
      return null;
  }
}
function StatusLabel({ status }: { status: OrdinalsbotInscriptionStatus }) {
  switch (status) {
    case 'pending':
      return <>{i18n.common.payingBrc}</>;
    case 'paid':
      return (
        <Tooltip label={i18n.common.tooltipLabelCreatingBrc}>
          <>{i18n.common.creatingBrc}</>
        </Tooltip>
      );
    case 'waiting-for-indexer':
      return (
        <Tooltip label={i18n.common.tooltipLabelReceivingBrc}>
          <>{i18n.common.receivingBrc}</>
        </Tooltip>
      );
    case 'ready':
      return <>{i18n.common.readyTransfer}</>;
    default:
      return null;
  }
}

export function PendingBrc20TransferList() {
  const transferOrders = usePendingBrc20Transfers();

  useCheckOrderStatuses(
    transferOrders.filter(order => order.status !== 'ready').map(order => order.id)
  );

  if (!transferOrders.length) return null;

  return (
    <Flex flexDirection="column" justifyContent="space-between" flex={1} my="space.04">
      <Flex columnGap="8px">
        <Caption>{i18n.common.pendingBrcTransfer}</Caption>
      </Flex>
      <Stack mt="space.02">
        {transferOrders.map(order => (
          <PendingBrcTransfer key={order.id} order={order} />
        ))}
      </Stack>
    </Flex>
  );
}

interface PendingBrcTransferProps {
  order: PendingBrc20Transfer;
}
function PendingBrcTransfer({ order }: PendingBrcTransferProps) {
  const [component, bind] = usePressable(order.status === 'ready');
  const navigate = useNavigate();
  const ordinalsbotClient = useOrdinalsbotClient();
  const currentAccountBtcAddress = useCurrentAccountNativeSegwitAddressIndexZero();
  const btcCryptoCurrencyAssetBalance = useNativeSegwitBalance(currentAccountBtcAddress);

  const hasPositiveBtcBalanceForFees =
    btcCryptoCurrencyAssetBalance.balance.amount.isGreaterThan(0);

  return (
    <Box
      key={order.id}
      my="space.03"
      onClick={
        hasPositiveBtcBalanceForFees
          ? order.status === 'ready'
            ? async () => {
                // Really inefficient, find way to not have to refetch data
                const { data: orderInfo } = await ordinalsbotClient.orderStatus(order.id);
                const { data: inscription } = await fetchInscripionById(
                  (orderInfo as any).files[0].tx?.inscription
                );
                navigate(RouteUrls.SendOrdinalInscription, {
                  state: {
                    inscription: convertInscriptionToSupportedInscriptionType({
                      ...inscription,
                      addressIndex: 0,
                    }),
                  },
                });
              }
            : noop
          : noop
      }
      {...(order.status === 'ready' ? bind : {})}
    >
      <>
        {order.amount} {order.tick}
      </>
      <HStack width="100%" mt="space.02">
        <CaptionDotSeparator>
          <Flex>
            <Flag
              ml="space.02"
              align="middle"
              spacing="space.02"
              img={<StatusIcon status={order.status} />}
            >
              <StatusLabel status={order.status} />
            </Flag>
          </Flex>
        </CaptionDotSeparator>
      </HStack>
      {component}
    </Box>
  );
}
