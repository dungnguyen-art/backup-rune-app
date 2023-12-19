import { useNavigate } from 'react-router-dom';

import { useLocationState } from '@app/common/hooks/use-location-state';
import { BaseDrawer } from '@app/components/drawer/base-drawer';
import { useBackgroundLocationRedirect } from '@app/routes/hooks/use-background-location-redirect';

import { ThemeList } from './theme-list';
import i18n from "@app/i18n";

export function ThemesDrawer() {
  useBackgroundLocationRedirect();
  const navigate = useNavigate();
  const backgroundLocation = useLocationState<Location>('backgroundLocation');
  return (
    <BaseDrawer title={i18n.modal.selectTheme} isShowing onClose={() => navigate(backgroundLocation ?? '..')}>
      <ThemeList />
    </BaseDrawer>
  );
}
