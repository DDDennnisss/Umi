import { Reducer, Effect, Subscription } from 'umi';
import {
  getRemoteList,
  editRecord,
  deleteRemoteList,
  createRemoteList,
} from './service';

interface UserModelType {
  namespace: 'test';
  state: {};
  reducers: {
    getList: Reducer;
  };
  effects: {
    getRemote: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserModel: UserModelType = {
  namespace: 'test',
  state: {},
  reducers: {
    getList(state, action) {
      return action.payload;
    },
  },
  effects: {
    *getRemote(action, effects) {
      const data = yield effects.call(getRemoteList);
      yield effects.put({
        type: 'getList',
        payload: data,
      });
    },

    *edit(action, effects) {
      const id = action.payload.id;
      const values = action.payload.values;
      const data = yield effects.call(editRecord, { id, values });
      yield effects.put({
        type: 'getRemote',
      });
    },

    *delete(action, effects) {
      const data = yield effects.call(deleteRemoteList, action.id);
      yield effects.put({
        type: 'getRemote',
      });
    },

    *add(action, effects) {
      const data = yield effects.call(createRemoteList, action.values);
      yield effects.put({
        type: 'getRemote',
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location) => {
        if (location.pathname === '/users') {
          dispatch({
            type: 'getRemote',
          });
        }
      });
    },
  },
};

export default UserModel;
