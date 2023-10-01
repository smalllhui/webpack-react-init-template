import React, { Fragment } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import I18nTest from '@/pages/I18nTest'
import StoreTest from '@/pages/StoreTest'
/**
 * @Description:App页面
 */
const App: React.FC = () => {
  return (
    <Fragment>
      <div>
        <Link to="/store">去store页面</Link>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <Link to="/i18n">去国际化语言页面</Link>
      </div>
      <Routes>
        <Route path="/store" element={<StoreTest />}></Route>
        <Route path="/i18n" element={<I18nTest />}></Route>
      </Routes>
    </Fragment>
  )
}

export default App
