import { GetLang, InitLanguageSystem, InitLanguageData, currentLanguage } from "@global-modules/LanguageSystem.js";
import CY from "@global-modules/cyteria.js";

import zh_tw from "./LanguageData/zh_tw.js";
import en from "./LanguageData/en.js";
import ja from "./LanguageData/ja.js";
import zh_cn from "./LanguageData/zh_cn.js";

export default function() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js', { 'updateViaCache': 'imports' });
    });
  }

  InitLanguageSystem();

  InitLanguageData({ zh_tw, en, ja, zh_cn });

  document.body.classList.add('lang-' + currentLanguage());

  if (CY.storageAvailable('localStorage')) {
    if (localStorage['app--font-family'] !== '1')
      document.body.classList.add('font1');
    if (localStorage['Theme--Night-Mode'] === '1')
      document.body.classList.add('theme--night-mode');
  }
  document.title = GetLang('Page Title/base');
}