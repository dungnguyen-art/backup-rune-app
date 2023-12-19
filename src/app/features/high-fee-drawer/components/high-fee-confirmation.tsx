import { useFormikContext } from 'formik';
import { HStack, Stack } from 'leather-styles/jsx';

import {
  BitcoinSendFormValues,
  StacksSendFormValues,
  StacksTransactionFormValues,
} from '@shared/models/form.model';

import { useDrawers } from '@app/common/hooks/use-drawers';
import { openInNewTab } from '@app/common/utils/open-in-new-tab';
import { LeatherButton } from '@app/ui/components/button';
import { Caption } from '@app/ui/components/typography/caption';
import { Title } from '@app/ui/components/typography/title';
import i18n from '@app/i18n'

export function HighFeeConfirmation({ learnMoreUrl }: { learnMoreUrl: string }) {
  const { handleSubmit, values } = useFormikContext<
    BitcoinSendFormValues | StacksSendFormValues | StacksTransactionFormValues
  >();
  const { setIsShowingHighFeeConfirmation } = useDrawers();

  return (
    <Stack px="space.05" gap="space.05" pb="space.06">
      <Title>
        {i18n.formatString(i18n.confirmation["highFee.title"], {
          fee: values.fee,
          feeCurrency: values.feeCurrency
        })}
      </Title>
      <Caption>
        {i18n.confirmation.highFeeConfirmation}{' '}
        <LeatherButton fontSize="14px" onClick={() => openInNewTab(learnMoreUrl)} variant="link">
          {i18n.common.learnMore}
        </LeatherButton>
      </Caption>
      <HStack mt="space.05">
        <LeatherButton
          onClick={() => setIsShowingHighFeeConfirmation(false)}
          width="50%"
          variant="outline"
        >
          {i18n.button.editFee}
        </LeatherButton>
        <LeatherButton onClick={() => handleSubmit()} width="50%" type="submit">
          {i18n.button.yesImSure}
        </LeatherButton>
      </HStack>
    </Stack>
  );
}

//i18n-variable
