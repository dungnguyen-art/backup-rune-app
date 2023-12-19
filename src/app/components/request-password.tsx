import { FormEvent, ReactNode, useCallback, useState } from 'react';

import { SettingsSelectors } from '@tests/selectors/settings.selectors';
import { Stack, styled } from 'leather-styles/jsx';

import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';
import { useKeyActions } from '@app/common/hooks/use-key-actions';
import { buildEnterKeyEvent } from '@app/common/hooks/use-modifier-key';
import { WaitingMessages, useWaitingMessage } from '@app/common/utils/use-waiting-message';
import { LeatherButton } from '@app/ui/components/button';

import { ErrorLabel } from './error-label';
import { TwoColumnLayout } from './secret-key/two-column.layout';
import i18n from '@app/i18n'



interface RequestPasswordProps {
  onSuccess(): void;
  title?: ReactNode;
  caption?: string;
}
export function RequestPassword({ title, caption, onSuccess }: RequestPasswordProps) {
  const waitingMessages: WaitingMessages = {
    '2': i18n.common.waitingMsgVerifying,
    '10': i18n.common.waitingMsgStillWorking,
    '20': i18n.common.waitingMsgStillAlmostThere,
  };
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { unlockWallet } = useKeyActions();
  const analytics = useAnalytics();
  const [isRunning, waitingMessage, startWaitingMessage, stopWaitingMessage] =
    useWaitingMessage(waitingMessages);

  const submit = useCallback(async () => {
    const startUnlockTimeMs = performance.now();
    void analytics.track('start_unlock');
    startWaitingMessage();
    setError('');
    try {
      await unlockWallet(password);
      onSuccess?.();
    } catch (error) {
      setError('The password you entered is invalid');
    }
    stopWaitingMessage();
    const unlockSuccessTimeMs = performance.now();
    void analytics.track('complete_unlock', {
      durationMs: unlockSuccessTimeMs - startUnlockTimeMs,
    });
  }, [analytics, startWaitingMessage, stopWaitingMessage, unlockWallet, password, onSuccess]);

  return (
    <>
      <TwoColumnLayout
        leftColumn={
          <>
            <styled.h1
              textStyle={['heading.03', 'heading.03', 'heading.03', 'display.02']}
              textAlign="left"
              mt="space.00"
              mb="space.06"
            >
              {title}
            </styled.h1>
            <styled.p textStyle={['label.01', 'heading.05']} mb="space.06">
              {(isRunning && waitingMessage) || caption}
            </styled.p>
          </>
        }
        rightColumn={
          <>
            <styled.h2
              textStyle="heading.03"
              mt="space.02"
              mb="space.04"
              hideBelow="sm"
              textAlign="center"
            >
              {i18n.common.yourPassword}
            </styled.h2>
            <Stack gap="space.04" alignItems="center">
              <styled.input
                _focus={{ border: 'focus' }}
                autoCapitalize="off"
                autoComplete="off"
                autoFocus
                border="active"
                borderRadius="sm"
                data-testid={SettingsSelectors.EnterPasswordInput}
                disabled={isRunning}
                height="64px"
                onChange={(e: FormEvent<HTMLInputElement>) => {
                  setError('');
                  setPassword(e.currentTarget.value);
                }}
                onKeyUp={buildEnterKeyEvent(submit)}
                p="space.04"
                placeholder={i18n.common.placeHolderEnterPassword}
                ring="none"
                type="password"
                textStyle="body.02"
                value={password}
                width="100%"
              />
              {error && <ErrorLabel>{error}</ErrorLabel>}
            </Stack>
            <LeatherButton
              data-testid={SettingsSelectors.UnlockWalletBtn}
              disabled={isRunning || !!error}
              aria-busy={isRunning}
              onClick={submit}
              mt={['space.11', 'space.05']}
            >
              {i18n.button.continue}
            </LeatherButton>
          </>
        }
      />
    </>
  );
}
