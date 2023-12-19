import { styled } from 'leather-styles/jsx';

import { LeatherButton } from '@app/ui/components/button';
import i18n from '@app/i18n'
export function SignInContent({
  onClick,
  twentyFourWordMode,
}: {
  onClick(): void;
  twentyFourWordMode: boolean;
}): React.JSX.Element {
  return (
    <>
      <styled.h1 textStyle={['heading.03', 'heading.03', 'heading.03', 'display.02']} mt="space.00">
        Sign in <br /> with your <br />
        Secret Key
      </styled.h1>
      <styled.p textStyle={['label.01', 'heading.05']} my="space.05">
        {i18n.common.entireSecretKey}
      </styled.p>
      <LeatherButton variant="link" textStyle="label.01" width="fit-content" onClick={onClick}>
        {twentyFourWordMode ? 'Have a 12-word Secret Key?' : 'Use 24 word Secret Key'}
      </LeatherButton>
    </>
  );
}
