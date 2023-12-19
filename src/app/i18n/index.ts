import LocalizedStrings from 'react-localization';
import en from './parts/en_US.json';
import vi from './parts/vi_VN.json';
import zh from './parts/zh_CN.json';
import ja from './parts/ja_JP.json';
import ru from './parts/ru_RU.json';

export const EN_US = 'en';
export const VI_VN = 'vi';
export const ZH_CN = 'zh';
export const JA_JP = 'ja';
export const RU_RU = 'ru';

const i18n = new LocalizedStrings({
  en,
  vi,
  // zh,
  // ja,
  // ru,
});

export default i18n;
