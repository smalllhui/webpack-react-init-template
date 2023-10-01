/**
 * 多语言切换管理
 */
// yarn add i18next react-i18next i18next-browser-languagedetector i18next-http-backend
import i18n from 'i18next'
// i18next-browser-languagedetector插件 这是一个 i18next 语言检测插件，用于检测浏览器中的用户语言，
// 详情请访问：https://github.com/i18next/i18next-browser-languageDetector
// 可以通过localStorage.getItem('i18nextLng')取出当前语言环境
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import enTranslation from './locales/en/en.json'
import jaTranslation from './locales/ja/ja.json'
// 引入需要实现国际化的简体、英文两种数据的json文件
import zhTranslation from './locales/zh/zh.json'

i18n
  // 加入Backend插件,用于从远程服务器获取国际化资源
  // 插件详见: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // 嗅探当前浏览器语言 zh_CN
  // 插件详见: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // 将 i18n 向下传递给 react-i18next
  .use(initReactI18next)
  // 初始化 i18next
  // 配置参数的文档: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en_GB: { translation: enTranslation },
      zh_CN: { translation: zhTranslation },
      ja_JP: { translation: jaTranslation },
    },
    fallbackLng: 'zh_CN', // 默认当前环境的语言
    debug: false, // 是否启用调试模式
    interpolation: { escapeValue: false },
  })

export default i18n
