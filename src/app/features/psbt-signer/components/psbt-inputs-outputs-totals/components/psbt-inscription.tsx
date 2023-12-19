import { Inscription } from '@shared/models/inscription.model';
import { isUndefined } from '@shared/utils';

import { openInNewTab } from '@app/common/utils/open-in-new-tab';
import { InscriptionPreview } from '@app/components/inscription-preview-card/components/inscription-preview';
import {
  createInscriptionInfoUrl,
  useInscription,
} from '@app/query/bitcoin/ordinals/inscription.hooks';
import { OrdinalIcon } from '@app/ui/components/icons/ordinal-icon';

import { PsbtAddressTotalItem } from './psbt-address-total-item';
import i18n from '@app/i18n'

interface PsbtInscriptionProps {
  inscription: Inscription;
}
export function PsbtInscription({ inscription }: PsbtInscriptionProps) {
  const { isLoading, isError, data: supportedInscription } = useInscription(inscription?.id ?? '');

  if (isLoading) return null;
  if (isError || isUndefined(supportedInscription))
    return (
      <PsbtAddressTotalItem
        image={<OrdinalIcon />}
        title={i18n.common.inscriptionNotFound}
        value={i18n.common.unknown}
      />
    );

  return (
    <PsbtAddressTotalItem
      image={<InscriptionPreview inscription={supportedInscription} height="40px" width="40px" />}
      title={i18n.common.inscription}
      value={`#${inscription?.number}`}
      valueAction={() => openInNewTab(createInscriptionInfoUrl(inscription?.id))}
    />
  );
}
