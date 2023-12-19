import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useFormikContext } from 'formik';
import { Stack, styled } from 'leather-styles/jsx';

import { StacksSendFormValues, StacksTransactionFormValues } from '@shared/models/form.model';

import { useOnMount } from '@app/common/hooks/use-on-mount';
import { openInNewTab } from '@app/common/utils/open-in-new-tab';
import { BaseDrawer } from '@app/components/drawer/base-drawer';
import { LeatherButton } from '@app/ui/components/button';

import { EditNonceForm } from './components/edit-nonce-form';

const url = 'https://www.hiro.so/questions/transactions-advanced-settings';
import i18n from '@app/i18n'
function CustomFeeMessaging() {
  return (
    <styled.span textStyle="caption.01">
      {i18n.common.customFeeMessaging}
      <LeatherButton fontSize="14px" ml="space.01" onClick={() => openInNewTab(url)} variant="link">
        {i18n.common.learnMore}
      </LeatherButton>
    </styled.span>
  );
}

export function EditNonceDrawer() {
  const { errors, setFieldError, setFieldValue, validateField, values } = useFormikContext<
    StacksSendFormValues | StacksTransactionFormValues
  >();
  const [loadedNextNonce, setLoadedNextNonce] = useState<number | string>();

  const navigate = useNavigate();
  const { search } = useLocation();

  useOnMount(() => setLoadedNextNonce(values.nonce));

  const onGoBack = useCallback(() => {
    if (search) {
      return navigate('..' + search, { replace: true });
    }
    navigate(-1);
  }, [navigate, search]);

  const onBlur = useCallback(() => validateField('nonce'), [validateField]);

  const onSubmit = useCallback(async () => {
    await validateField('nonce');
    if (!errors.nonce) onGoBack();
  }, [errors.nonce, onGoBack, validateField]);

  const onClose = useCallback(async () => {
    if (!values.nonce) await setFieldValue('nonce', undefined);
    setFieldError('nonce', '');
    await setFieldValue('nonce', loadedNextNonce);
    onGoBack();
  }, [loadedNextNonce, onGoBack, setFieldError, setFieldValue, values.nonce]);

  return (
    <BaseDrawer isShowing onClose={onClose} pauseOnClickOutside title="Edit nonce">
      <Stack gap="space.05" pb="space.06" px="space.05">
        <CustomFeeMessaging />
        <EditNonceForm onBlur={onBlur} onClose={onClose} onSubmit={onSubmit} />
      </Stack>
    </BaseDrawer>
  );
}
