import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';
import { useKeyActions } from '@app/common/hooks/use-key-actions';
import i18n from '@app/i18n';
export function useCreateAccount() {
  const { createNewAccount } = useKeyActions();
  const analytics = useAnalytics();

  return useCallback(() => {
    void analytics.track('create_new_account');
    void toast.promise(createNewAccount(), {
      loading: i18n.notification.createAccountLoading,
      success: i18n.notification.createAccountLoading,
      error: i18n.notification.createAccountError,
    });
  }, [analytics, createNewAccount]);
}
