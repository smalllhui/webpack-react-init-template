// 导入国际化
import '@/i18n'
// 样式初始化
import 'normalize.css/normalize.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
// store
import { Provider } from 'react-redux'
// 路由
import { BrowserRouter } from 'react-router-dom'
// PersistGate的作用是向下分发persistStore对象；
import { PersistGate } from 'redux-persist/lib/integration/react'

// 入口页面
import App from '@/App'
import store, { persistor } from '@/store'

// 项目资源名 需要在package.json文件中添加 "homepage": "/"
const basename = '/'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
