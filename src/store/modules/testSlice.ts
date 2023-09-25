import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

// 数据接口列席
interface ICountState {
  count: number
  movieList: any[]
  total: number
}

//电影API
const MovieAPI = {
  /**
   * 请求电影列表
   */
  getMovieListApi: () =>
    fetch('https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=24&page_id=1&ret_num=48').then(
      res => res.json(),
    ),
}

// thunk函数允许执行异步逻辑, 通常用于发出异步请求。
// createAsyncThunk 创建一个异步action，方法触发的时候会有三种状态：pending（进行中）、fulfilled（成功）、rejected（失败）
// 导出异步action方法
export const getMovieData = createAsyncThunk('movie/getMovie', async (params: { pageSize: number }) => {
  console.log('传递参数')
  console.log(params)
  const res = await MovieAPI.getMovieListApi()
  return res
})

// 初始值
const initialState: ICountState = {
  count: 0,
  movieList: [],
  total: 0,
}

/**
 * 创建一个Count的slice
 */
const CountSlice = createSlice({
  name: 'count-slice',
  initialState,
  reducers: {
    /**
     *加1操作
     */
    increment: (state: Draft<ICountState>) => {
      state.count = state.count + 1
    },
    /**
     *数字加 根据参数
     */
    incrementByAmount: (
      state: Draft<ICountState>,
      action: PayloadAction<{
        num: number
      }>,
    ) => {
      state.count = state.count + action.payload.num
    },
  },

  // extraReducers 字段让 slice 处理在别处定义的 actions,包括由 createAsyncThunk或其它slice生成的action。
  extraReducers(builder) {
    // 处理createAsyncThunk 生成的 actions
    builder
      .addCase(getMovieData.pending, (state, action) => {
        console.log('🚀 ~ 进行中！')
        console.log(state, action)
      })
      .addCase(getMovieData.fulfilled, (state, { payload }) => {
        console.log('🚀 ~ fulfilled', payload)
        state.movieList = payload.data.list
        state.total = payload.data.list.length
      })
      .addCase(getMovieData.rejected, (state, action) => {
        console.log('🚀 ~ rejected')
        console.log(state, action)
      })
  },
})

// 导出同步action方法
export const { incrementByAmount, increment } = CountSlice.actions
// 默认导出
export default CountSlice.reducer
