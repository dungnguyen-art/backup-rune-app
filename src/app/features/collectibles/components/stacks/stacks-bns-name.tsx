import StacksNftBns from '@assets/images/stacks-nft-bns.png';

import { StxIcon } from '@app/ui/components/icons/stx-icon';

import { CollectibleItemLayout } from '../collectible-item.layout';
import i18n from '@app/i18n'

export function StacksBnsName(props: { bnsName: string }) {
  const { bnsName } = props;

  return (
    <CollectibleItemLayout
      collectibleTypeIcon={<StxIcon size="lg" />}
      subtitle={i18n.common.stacksBnsName}
      title={bnsName}
    >
      <img alt="nft image" src={StacksNftBns} width="100px" />
    </CollectibleItemLayout>
  );
}
