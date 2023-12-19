import { Flex } from 'leather-styles/jsx';

import { LeatherButton } from '@app/ui/components/button';
import i18n from '@app/i18n'
interface CreateAccountActionProps {
  onCreateAccount(): void;
}
export function CreateAccountAction({ onCreateAccount }: CreateAccountActionProps) {
  return (
    <Flex
      mt="100px"
      py="space.05"
      px="space.05"
      flexGrow="1"
      position="fixed"
      bottom={0}
      width="100%"
      zIndex={1}
    >
      <LeatherButton fullWidth onClick={() => onCreateAccount()}>
        {i18n.button.createNewAccount}
      </LeatherButton>
    </Flex>
  );
}
