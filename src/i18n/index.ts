import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import { I18n } from 'lunar-typescript';

import zhCN from './locales/zh-CN.json';
import enUS from './locales/en-US.json';

// 支持的语言列表
export const supportedLanguages = {
  'zh-CN': '简体中文',
  'en-US': 'English',
} as const;

export type SupportedLanguage = keyof typeof supportedLanguages;

// 默认语言
export const defaultLanguage: SupportedLanguage = 'zh-CN';

// 语言检测配置
const detectionOptions = {
  // 检测顺序：localStorage -> navigator -> 默认语言
  order: ['localStorage', 'navigator'],
  // localStorage 键名
  lookupLocalStorage: 'calendar-remark-language',
  // 缓存用户选择
  caches: ['localStorage'],
  // 排除某些检测方法
  excludeCacheFor: ['cimode'],
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'zh-CN': {
        translation: zhCN,
      },
      'en-US': {
        translation: enUS,
      },
    },
    fallbackLng: defaultLanguage,
    debug: import.meta.env.DEV,
    detection: detectionOptions,
    interpolation: {
      escapeValue: false, // React 已经处理了 XSS
    },
    // 命名空间配置
    defaultNS: 'translation',
    ns: ['translation'],
  });

// 监听语言变化，同步更新 dayjs 语言环境
i18n.on('languageChanged', (lng: string) => {
  if (lng.startsWith('zh')) {
    dayjs.locale('zh-cn');
  } else {
    dayjs.locale('en');
  }

  // 同步 lunar-typescript 的 I18n 语言（6tail I18n）
  // lunar 的语言码：简体中文 chs、英文 en
  try {
    const lunarLang = lng.startsWith('zh') ? 'chs' : 'en';
    I18n.init();
    I18n.setLanguage(lunarLang);
  } catch (e) {
    // 避免因 lunar I18n 异常影响应用，其失败可忽略
    if (import.meta.env.DEV) {
      console.warn('[lunar I18n] setLanguage failed:', e);
    }
  }
});

// 初始化时设置 dayjs 语言环境
if (i18n.language.startsWith('zh')) {
  dayjs.locale('zh-cn');
} else {
  dayjs.locale('en');
}

// 初始化时同步 lunar 语言环境
try {
  const lunarLang = i18n.language.startsWith('zh') ? 'chs' : 'en';
  I18n.init();
  I18n.setLanguage(lunarLang);
} catch (e) {
  if (import.meta.env.DEV) {
    console.warn('[lunar I18n] initial setLanguage failed:', e);
  }
}

export default i18n;
