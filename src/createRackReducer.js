import _filter from 'lodash-es/filter';
import _find from 'lodash-es/find';
import _get from 'lodash-es/get';
import _includes from 'lodash-es/includes';
import _reduce from 'lodash-es/reduce';
import _set from 'lodash-es/set';

import combineReducers from './combineReducers';

export const STAGE_REDUCER = 'STAGE_REDUCER';
export const MOUNT_REDUCER = 'MOUNT_REDUCER';
export const UNMOUNT_REDUCER = 'UNMOUNT_REDUCER';

export const actions = [STAGE_REDUCER, MOUNT_REDUCER, UNMOUNT_REDUCER];

export function createRackReducer(staticReducer = s => s) {
  return (state = {}, action) => {
    if (_includes(actions, action.type)) {
      let { __rack__ = [] } = state;
      const { type, payload } = action;
      const racked = _find(__rack__, payload);

      if (type === STAGE_REDUCER && !racked)
        __rack__ = [...__rack__, { ...payload, staged: Date.now() }];

      if (type === MOUNT_REDUCER && (!racked || racked.staged))
        __rack__ = [...__rack__, { ...payload, staged: false }];

      if (type === UNMOUNT_REDUCER) __rack__ = _filter(__rack__, payload);

      state.__rack__ = __rack__;
    }

    state = staticReducer(state, action);

    const now = Date.now();
    return _reduce(
      state.__rack__,
      (state, { path, reducer, staged }) => {
        if (!staged || staged + 100 < now) {
          if (!path) {
            state = reducer(state, action);
          } else {
            let prev = _get(state, path);
            let next = reducer(prev, action);

            if (prev !== next) state = _set({ ...state }, path, next);
          }
        }

        return state;
      },
      state
    );
  };
}

export default createRackReducer;
