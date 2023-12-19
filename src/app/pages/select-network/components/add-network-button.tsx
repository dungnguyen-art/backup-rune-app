import { SettingsSelectors } from '@tests/selectors/settings.selectors';
import { Flex } from 'leather-styles/jsx';
import i18n from '@app/i18n'
import { LeatherButton } from '@app/ui/components/button';

interface AddNetworkButtonProps {
  onAddNetwork(): void;
}
export function AddNetworkButton({ onAddNetwork }: AddNetworkButtonProps) {
  return (
    <Flex py="space.05" px="space.05" flexGrow="1">
      <LeatherButton data-testid={SettingsSelectors.BtnAddNetwork} fullWidth onClick={onAddNetwork}>
        {i18n.button.addaNetwork}
      </LeatherButton>
    </Flex>
  );
}
