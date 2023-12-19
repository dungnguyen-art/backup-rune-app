import { Flex, styled } from 'leather-styles/jsx';

import { Favicon } from '@app/components/favicon';
import { Flag } from '@app/components/layout/flag';
import i18n from '@app/i18n'

interface PsbtRequestHeaderProps {
  name?: string;
  origin: string;
}
export function PsbtRequestHeader({ name, origin }: PsbtRequestHeaderProps) {
  const displayName = name ?? origin;
  const caption = displayName ? `Requested by ${displayName}` : null;

  return (
    <Flex flexDirection="column" my="space.05" width="100%">
      <styled.h1 mb="space.04" textStyle="heading.03">
        {i18n.formatString(i18n.common.approveTransaction, {
          htmlTag: <br/>
        })}
      </styled.h1>
      <styled.p mb="space.04" textStyle="label.01">
        {i18n.common.reviewRecipientAddress}
      </styled.p>
      {caption && (
        <Flag align="middle" img={<Favicon origin={origin} />} pl="space.02">
          <styled.span textStyle="label.02" wordBreak="break-word">
            {caption}
          </styled.span>
        </Flag>
      )}
    </Flex>
  );
}
