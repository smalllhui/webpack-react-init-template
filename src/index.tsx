import React from 'react'
import ReactDOM from 'react-dom/client'
// 路由
import { BrowserRouter } from 'react-router-dom'
// store
import { Provider } from 'react-redux'
import store, { persistor } from '@/store'
// PersistGate的作用是向下分发persistStore对象；
import { PersistGate } from 'redux-persist/lib/integration/react'

// 样式
import './reset.css'
// 入口页面
import App from '@/App'

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
