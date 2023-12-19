import { useLayoutEffect, useRef, useState } from 'react';
import Confetti from 'react-dom-confetti';

import { Dialog } from '@radix-ui/themes';
import { Inset } from '@radix-ui/themes';
import { css } from 'leather-styles/css';
import { Box, Flex, Stack, styled } from 'leather-styles/jsx';

import { HasChildren } from '@app/common/has-children';
import { openInNewTab } from '@app/common/utils/open-in-new-tab';
import { LeatherButton } from '@app/ui/components/button';

import { confettiConfig } from './confetti-config';
import { useLeatherIntroDialogContext } from './leather-intro-dialog';
import i18n from '@app/i18n'

export function LeatherIntroDialog({ children }: HasChildren) {
  return (
    <Dialog.Root defaultOpen>
      <Dialog.Content
        // Prevent immediate closing, force interation
        onEscapeKeyDown={e => e.preventDefault()}
        onInteractOutside={e => e.preventDefault()}
        className={css({ maxWidth: '500px', backgroundColor: 'accent.background-primary' })}
      >
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
}

export function LeatherIntroDialogPart1() {
  const context = useLeatherIntroDialogContext();
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <>
      <Box data-confetti pos="absolute" left={0} top={0} right={0} bottom={0} mt="space.01">
        <Box position="relative" left="50%" top="30%">
          <Confetti active={showConfetti} config={confettiConfig} />
        </Box>
      </Box>

      <Box position="relative" zIndex={9}>
        <styled.img
          alt="Cool brand sticks conforming to Hiro Wallet's new brand"
          src="assets/illustrations/layered-diamond-coin.png"
          w="270px"
          h="236px"
        />
        <styled.h1 textStyle="heading.02" mt="space.03">
          {i18n.common.leatherTitlePart1}
        </styled.h1>
        <styled.p textStyle="heading.05" mt="24px" mr="20px">
          {i18n.common.leatherIntroPart1}
        </styled.p>
        <Flex mt="48px">
          <LeatherButton
            onClick={() => {
              context.onRevealNewName();
              setShowConfetti(true);
            }}
          >
            {!showConfetti ? i18n.common.revealName : i18n.common.introducing}
          </LeatherButton>
        </Flex>
      </Box>
    </>
  );
}

export function LeatherIntroDialogPart2() {
  const ref = useRef<HTMLVideoElement>(null);
  const context = useLeatherIntroDialogContext();

  useLayoutEffect(() => {
    if (ref.current) ref.current.playbackRate = 0.65;
  }, [ref]);

  return (
    <Box>
      <styled.h1 textStyle="heading.02">Say hello to</styled.h1>

      <Box height="286px" mt="48px" filter="invert()">
        <Inset>
          <video ref={ref} src="assets/video/animated-leather-logo.mp4" autoPlay muted />
        </Inset>
      </Box>
      <Box mt="24px">
        {i18n.common.leatherIntroPart2}{' '}
        <styled.a
          href="https://leather.io/blog/leather-wallet-brand-launch"
          textDecoration="underline"
          onClick={e => {
            e.preventDefault();
            openInNewTab('https://leather.io/blog/leather-wallet-brand-launch');
          }}
        >
          {i18n.common.learnMoreWithIcon}
        </styled.a>
      </Box>
      <styled.span textStyle="caption.02" display="block" textAlign="left" mt="16px">
        Leather Wallet will now be provided by Leather Wallet LLC [a subsidiary of Nassau Machines
        Inc]. Please review and accept Leather Wallet{' '}
        <styled.a href="https://leather.io/terms" textDecoration="underline" target="_blank">
          Terms of Service
        </styled.a>{' '}
        and{' '}
        <styled.a
          href="https://leather.io/privacy-policy"
          target="_blank"
          textDecoration="underline"
        >
          Privacy Policy
        </styled.a>
        .
      </styled.span>
      <Stack gap="16px" mt="space.05">
        <LeatherButton onClick={context.onAcceptTerms}>Accept new terms</LeatherButton>
        <LeatherButton onClick={context.onRejectAndUninstall} variant="outline">
          {i18n.common.refuseAndUninstall}
        </LeatherButton>
      </Stack>
    </Box>
  );
}
//i18n-variable
