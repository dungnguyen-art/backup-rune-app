import { useNavigate } from 'react-router-dom';

import { Form, Formik } from 'formik';
import { Box, Flex } from 'leather-styles/jsx';

import { RouteUrls } from '@shared/route-urls';

import { BaseDrawer } from '@app/components/drawer/base-drawer';
import { ErrorLabel } from '@app/components/error-label';
import { InscriptionPreview } from '@app/components/inscription-preview-card/components/inscription-preview';
import { InscriptionPreviewCard } from '@app/components/inscription-preview-card/inscription-preview-card';
import { LeatherButton } from '@app/ui/components/button';
import { OrdinalIcon } from '@app/ui/components/icons/ordinal-icon';

import { RecipientField } from '../send-crypto-asset-form/components/recipient-field';
import { CollectibleAsset } from './components/collectible-asset';
import { useSendInscriptionState } from './components/send-inscription-container';
import { useSendInscriptionForm } from './hooks/use-send-inscription-form';
import { SendInscriptionFormLoader } from './send-indcription-form-loader';
import i18n from '@app/i18n'
export const recipeintFieldName = 'recipient';

export function SendInscriptionForm() {
  const navigate = useNavigate();
  const { feeRates, inscription, recipient } = useSendInscriptionState();
  const { chooseTransactionFee, currentError, validationSchema, isCheckingFees } =
    useSendInscriptionForm();

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        [recipeintFieldName]: recipient,
        inscription,
        feeRate: feeRates.hourFee.toNumber(),
      }}
      onSubmit={chooseTransactionFee}
    >
      <Form>
        <BaseDrawer title={i18n.common.send} enableGoBack isShowing onClose={() => navigate(RouteUrls.Home)}>
          <SendInscriptionFormLoader isLoading={isCheckingFees}>
            <Box display="flex" flexDirection="column" px="space.06" pb="space.04">
              <InscriptionPreviewCard
                image={<InscriptionPreview inscription={inscription} />}
                subtitle='Ordinal inscription'
                title={inscription.title}
              />
              <Box mt={['space.04', 'space.06', '100px']}>
                <Flex flexDirection="column" mt="space.05" width="100%">
                  <CollectibleAsset icon={<OrdinalIcon />} name="Ordinal inscription" />
                  <RecipientField
                    name={recipeintFieldName}
                    label={i18n.common.to}
                    placeholder={i18n.common.enterRecipientAddress}
                  />
                </Flex>
              </Box>
              {currentError && <ErrorLabel>{currentError}</ErrorLabel>}
              <LeatherButton type="submit">{i18n.button.continue}</LeatherButton>
            </Box>
          </SendInscriptionFormLoader>
        </BaseDrawer>
      </Form>
    </Formik>
  );
}
