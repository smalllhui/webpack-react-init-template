import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'
// persistStore 为redux-persist内置的状态管理仓库；persistReducer 为内置的切片管理；
import { persistReducer, persistStore } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // 本地存储
import storage from 'redux-persist/lib/storage/session' // 会话存储

// 多个Slice的引入；
import modules from './modules'

// 配置要存储的Slice；
const persistConfig = {
  key: 'root', // key是放入localStorage中的key
  storage,
  // whitelist: ['language'], // 需要缓存的数据  默认缓存所有
  // blacklist: ['navigation'], // navigation不会被存入缓存中，其他会，适用于少部分数据需要实时更新
}

// 合并多个Slice
const rootReducer = combineReducers(modules)
const myPersistReducer = persistReducer(persistConfig, rootReducer)
// configureStore创建一个redux数据
const store = configureStore({
  reducer: myPersistReducer,
  // 配置中间键
  middleware: getDefaultMiddleware =>
    // getDefaultMiddleware({ serializableCheck: false }).concat(), //不打印logger
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// 二次封装：对useDispatch，useSelector进行封装，解决每次使用都要导入RootState,AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const persistor = persistStore(store)
export default store
