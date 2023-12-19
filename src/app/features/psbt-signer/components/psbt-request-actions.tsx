import { Box, HStack } from 'leather-styles/jsx';

import { LeatherButton } from '@app/ui/components/button';
import i18n from '@app/i18n'
interface PsbtRequestActionsProps {
  isLoading?: boolean;
  onCancel(): void;
  onSignPsbt(): void;
}
export function PsbtRequestActions({ isLoading, onCancel, onSignPsbt }: PsbtRequestActionsProps) {
  return (
    <Box
      bg="accent.background-primary"
      borderTop="default"
      bottom="0px"
      height="96px"
      position="absolute"
      px="space.05"
      width="100%"
      zIndex={999}
    >
      <HStack gap="space.04" mt="space.05">
        <LeatherButton flexGrow={1} onClick={onCancel} variant="outline">
          {i18n.button.cancel}
        </LeatherButton>
        <LeatherButton flexGrow={1} aria-busy={isLoading} onClick={onSignPsbt}>
          {i18n.button.confirm}
        </LeatherButton>
      </HStack>
    </Box>
  );
}
