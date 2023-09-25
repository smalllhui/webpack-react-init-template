export type LanguageType = {
  key: string
  language: string
}

const languageList: LanguageType[] = [
  { key: 'en_GB', language: '语言.英语' },
  { key: 'zh_CN', language: '语言.简体中文' },
  { key: 'ja_JP', language: '语言.日语' },
]

export default languageList
