import i18nModule, { EN_US } from '@app/i18n';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { SETTINGS_LANGUAGE } from '@app/constants/localStorage';

const setupI18n = (userLang: string) => {
  i18nModule.setLanguage(userLang || EN_US);
};

export default function useSetupI18n(): { isI18nReady: boolean } {
  const [isI18nReady, setIsI18nReady] = useState(false);
  const [language] = useLocalStorage(SETTINGS_LANGUAGE, EN_US);
  const [, setForceUpdate] = useState<any | undefined>();

  useEffect(() => {
    if (language) {
      setupI18n(language);
      setForceUpdate({});
      setIsI18nReady(true);
    }
  }, [language]);

  return {
    isI18nReady
  }
}
