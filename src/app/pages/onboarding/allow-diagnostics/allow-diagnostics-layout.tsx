import { Dialog } from '@radix-ui/themes';
import { OnboardingSelectors } from '@tests/selectors/onboarding.selectors';
import { css } from 'leather-styles/css';
import { Box, Flex, HStack, Stack, styled } from 'leather-styles/jsx';

import { LeatherButton } from '@app/ui/components/button';
import { CheckmarkIcon } from '@app/ui/components/icons/checkmark-icon';
import { LeatherIcon } from '@app/ui/components/icons/leather-icon';
import i18n from '@app/i18n'
interface ReasonToAllowDiagnosticsProps {
  text: string;
}
function ReasonToAllowDiagnostics({ text }: ReasonToAllowDiagnosticsProps) {
  return (
    <Flex textStyle="body.02">
      <Box mr="space.02" mt="3px">
        <CheckmarkIcon />
      </Box>
      <Box>{text}</Box>
    </Flex>
  );
}

interface AllowDiagnosticsLayoutProps {
  onUserAllowDiagnostics(): void;
  onUserDenyDiagnostics(): void;
}
export function AllowDiagnosticsLayout(props: AllowDiagnosticsLayoutProps) {
  const { onUserAllowDiagnostics, onUserDenyDiagnostics } = props;
  return (
    <Dialog.Root open>
      <Dialog.Content
        className={css({
          width: '500px',
          marginY: 'space.03',
          backgroundColor: 'accent.background-primary',
        })}
      >
        <LeatherIcon width="72px" />
        <styled.h1 textStyle="heading.03" mt={['space.05', 'space.08']}>
          {i18n.common.helpUsImprove}
        </styled.h1>
        <styled.p mt={['space.03', 'space.05']} textStyle="heading.05">
          {i18n.common.allowDiagnostic}
        </styled.p>

        <Stack mt={['space.04', 'space.05']} textStyle="body.01">
          <ReasonToAllowDiagnostics text="Send data about page views, clicks, and errors" />
          <ReasonToAllowDiagnostics text="This data is tied to randomly-generated IDs, and not personal data such as your Stacks address, keys, balances or IP address" />
          <ReasonToAllowDiagnostics text="This data is used to generate and send crash reports, help fix errors, and analyze statistics" />
        </Stack>

        <HStack mt={['space.07', 'space.11']} gap="space.04">
          <LeatherButton
            fullWidth
            variant="outline"
            onClick={() => onUserDenyDiagnostics()}
            data-testid={OnboardingSelectors.DenyAnalyticsBtn}
          >
            {i18n.button.deny}
          </LeatherButton>
          <LeatherButton
            autoFocus
            fullWidth
            data-testid={OnboardingSelectors.AllowAnalyticsBtn}
            onClick={onUserAllowDiagnostics}
          >
            {i18n.button.allow}
          </LeatherButton>
        </HStack>
      </Dialog.Content>
    </Dialog.Root>
  );
}
