import { memberList } from '@/services/member';

export default {

  //在全局 state 上的 key
  namespace: 'member',

  //初始值
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  //处理异步逻辑
  effects: {
    *fetch({ payload }, { call, put }) {
      console.log(payload,call,put);
      const response = yield call(memberList, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
  //等同于 redux 里的 reducer，接收 action，同步更新 state
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
