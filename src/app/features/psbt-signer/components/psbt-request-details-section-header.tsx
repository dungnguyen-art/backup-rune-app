import { HStack, styled } from 'leather-styles/jsx';

import { LeatherButton } from '@app/ui/components/button';
import { ArrowUpIcon } from '@app/ui/components/icons/arrow-up-icon';
import i18n from '@app/i18n'

interface PsbtRequestDetailsSectionHeaderProps {
  hasDetails?: boolean;
  onSetShowDetails?(value: boolean): void;
  showDetails?: boolean;
  title: string;
}
export function PsbtRequestDetailsSectionHeader({
  hasDetails,
  onSetShowDetails,
  showDetails,
  title,
}: PsbtRequestDetailsSectionHeaderProps) {
  return (
    <HStack alignItems="center" justifyContent="space-between">
      <styled.span textStyle="label.01">{title}</styled.span>
      {hasDetails && onSetShowDetails ? (
        <LeatherButton onClick={() => onSetShowDetails(!showDetails)} variant="text">
          {showDetails ? (
            <HStack gap="space.01">
              {i18n.common.seeLess}<ArrowUpIcon />
            </HStack>
          ) : (
              i18n.common.seeDetails
          )}
        </LeatherButton>
      ) : null}
    </HStack>
  );
}
