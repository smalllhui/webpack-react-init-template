import React from 'react'
import ReactDOM from 'react-dom/client'

// store
import { Provider } from 'react-redux'
import store, { persistor } from '@/store'
// PersistGate的作用是向下分发persistStore对象；
import { PersistGate } from 'redux-persist/lib/integration/react'

// 样式
import './reset.css'
// 入口页面
import App from '@/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
