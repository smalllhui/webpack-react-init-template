/**
 * 该文件用于合并所有slice
 */

// 多个Slice的引入；
import testSlice from './testSlice'

// test：表示testSlice的模块名称  store.test.xxx 就可以取到testSlice管理的数据
export default {
  test: testSlice,
}
