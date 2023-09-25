import React from 'react'
import { useAppSelector, useAppDispatch } from '@/store'
import { increment, incrementByAmount, getMovieData } from '@/store/modules/testSlice'
/**
 * @Description:Store测试
 */
const StoreTest: React.FC = () => {
  const testStore = useAppSelector(store => store.test)
  const dispatch = useAppDispatch()

  // 加  同步测试
  const onIncrementByAmount = (num: number) => {
    dispatch(incrementByAmount({ num }))
  }
  // 加1
  const onIncrement = () => {
    dispatch(increment())
  }

  // 查询电影列表 异步action测试
  const onQueryMovieList = () => {
    dispatch(getMovieData({ pageSize: 9 }))
  }
  return (
    <div style={{ height: '100%' }}>
      <h1>Store测试-----当前count:{testStore.count}</h1>
      <button onClick={onIncrement}>+1</button>
      <button onClick={() => onIncrementByAmount(2)}>count+5</button>
      <button onClick={() => onIncrementByAmount(-1)}>count-1</button>
      <h1>电影列表----共有{testStore.total}个</h1>
      <button onClick={onQueryMovieList}>获取电影列表</button>
      <ul>
        {testStore.movieList.map((movie, index) => {
          return <li key={index}>{movie.name}</li>
        })}
      </ul>
    </div>
  )
}

export default StoreTest
