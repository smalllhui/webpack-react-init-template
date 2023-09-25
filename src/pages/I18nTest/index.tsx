import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

// 语言列表
import languageList from '@/i18n/language'

/**
 * @Description:多语言测试页面
 */
const I18nTest: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [selectedKey, setSelectedKey] = useState(i18n.language)

  // 切换语言事件
  const onChangeLanguage = (key: string) => {
    setSelectedKey(key)
    i18n.changeLanguage(key)
  }

  return (
    <div>
      <h1>多语言测试</h1>
      <ul>
        {languageList.map(item => {
          return (
            <li
              key={item.key}
              onClick={() => onChangeLanguage(item.key)}
              style={{ color: selectedKey === item.key ? 'red' : '' }}
            >
              {t(`${item.language}`)}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default I18nTest
