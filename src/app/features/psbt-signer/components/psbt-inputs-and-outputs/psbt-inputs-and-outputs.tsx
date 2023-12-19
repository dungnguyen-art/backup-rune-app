import { useState } from 'react';

import { usePsbtSignerContext } from '@app/features/psbt-signer/psbt-signer.context';

import { PsbtRequestDetailsSectionHeader } from '../psbt-request-details-section-header';
import { PsbtRequestDetailsSectionLayout } from '../psbt-request-details-section.layout';
import { PsbtInputList } from './components/psbt-input-list/psbt-input-list';
import { PsbtOutputList } from './components/psbt-output-list/psbt-output-list';
import i18n from '@app/i18n'
export function PsbtInputsAndOutputs() {
  const { psbtInputs, psbtOutputs } = usePsbtSignerContext();
  const [showDetails, setShowDetails] = useState(false);

  if (!psbtInputs.length || !psbtOutputs.length) return null;

  return (
    <PsbtRequestDetailsSectionLayout>
      <PsbtRequestDetailsSectionHeader
        hasDetails
        onSetShowDetails={(value: boolean) => setShowDetails(value)}
        showDetails={showDetails}
        title={showDetails ? i18n.common.inputs : i18n.common.inputsAndOutputs}
      />
      {showDetails ? (
        <>
          <PsbtInputList inputs={psbtInputs} />
          <PsbtRequestDetailsSectionHeader title={i18n.common.outputs} />
          <PsbtOutputList outputs={psbtOutputs} />
        </>
      ) : null}
    </PsbtRequestDetailsSectionLayout>
  );
}
