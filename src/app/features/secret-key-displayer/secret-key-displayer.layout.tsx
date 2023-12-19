import { useState } from 'react';

import { OnboardingSelectors } from '@tests/selectors/onboarding.selectors';
import { SettingsSelectors } from '@tests/selectors/settings.selectors';
import { Flex, styled } from 'leather-styles/jsx';

import { LeatherButton } from '@app/ui/components/button';
import { CopyIcon } from '@app/ui/components/icons/copy-icon';
import { EyeIcon } from '@app/ui/components/icons/eye-icon';
import { EyeSlashIcon } from '@app/ui/components/icons/eye-slash-icon';

import { SecretKeyGrid } from '../../components/secret-key/secret-key-grid';
import { SecretKeyWord } from './components/secret-key-word';
import i18n from '@app/i18n'

interface SecretKeyDisplayerLayoutProps {
  hasCopied: boolean;
  onCopyToClipboard(): void;
  secretKeyWords: string[] | undefined;
  showTitleAndIllustration: boolean;
  onBackedUpSecretKey(): void;
}
export function SecretKeyDisplayerLayout(props: SecretKeyDisplayerLayoutProps) {
  const { hasCopied, onCopyToClipboard, onBackedUpSecretKey, secretKeyWords } = props;
  const [showSecretKey, setShowSecretKey] = useState(false);

  return (
    <>
      <SecretKeyGrid>
        {secretKeyWords?.map((word, index) => (
          <SecretKeyWord
            key={word}
            word={showSecretKey ? word : '*'.repeat(word.length)}
            num={index + 1}
          />
        ))}
      </SecretKeyGrid>
      <Flex gap="space.02" alignItems="center" width="100%">
        <LeatherButton
          variant="outline"
          flex="1"
          display="flex"
          px="space.04"
          py="space.03"
          justifyContent="center"
          alignItems="center"
          gap="space.02"
          data-testid={SettingsSelectors.ShowSecretKeyBtn}
          onClick={() => setShowSecretKey(!showSecretKey)}
        >
          {showSecretKey ? <EyeSlashIcon size="20px" /> : <EyeIcon size="20px" />}
          <styled.p textStyle="body.02">{showSecretKey ? i18n.button.hideKey : i18n.button.showKey}</styled.p>
        </LeatherButton>
        <LeatherButton
          variant="outline"
          flex="1"
          display="flex"
          px="space.04"
          py="space.03"
          justifyContent="center"
          alignItems="center"
          gap="space.02"
          data-testid={SettingsSelectors.CopyKeyToClipboardBtn}
          onClick={!hasCopied ? onCopyToClipboard : undefined}
        >
          <CopyIcon />
          <styled.p textStyle="body.02">{!hasCopied ? i18n.common.copy : i18n.common.copied}</styled.p>
        </LeatherButton>
      </Flex>
      <LeatherButton
        width="100%"
        data-testid={OnboardingSelectors.BackUpSecretKeyBtn}
        onClick={onBackedUpSecretKey}
      >
          {i18n.button.backedUp}
      </LeatherButton>
    </>
  );
}
