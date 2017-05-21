import _filter from 'lodash-es/filter';
import _isString from 'lodash-es/isString';
import _isFunction from 'lodash-es/isFunction';
import { createStore } from 'redux';

import {
  createRackReducer,
  STAGE_REDUCER,
  MOUNT_REDUCER,
  UNMOUNT_REDUCER,
} from './createRackReducer';

export function createRackStore(reducer, initialState, enhancers) {
  const store = createStore(
    createRackReducer(reducer),
    initialState,
    enhancers
  );

  const { replaceReducer } = store;

  store.replaceReducer = nextReducer =>
    replaceReducer.call(store, createRackReducer(nextReducer));

  store.stageReducer = (...args) => {
    let [path] = _filter(args, _isString);
    let [reducer] = _filter(args, _isFunction);

    store.dispatch({
      type: STAGE_REDUCER,
      payload: { path, reducer },
    });
  };

  store.mountReducer = (...args) => {
    let [path] = _filter(args, _isString);
    let [reducer] = _filter(args, _isFunction);

    store.dispatch({
      type: MOUNT_REDUCER,
      payload: { path, reducer },
    });
  };

  store.unmountReducer = (...args) => {
    let [path] = _filter(args, _isString);
    let [reducer] = _filter(args, _isFunction);

    store.dispatch({
      type: UNMOUNT_REDUCER,
      payload: { path, reducer },
    });
  };

  return store;
}

export default createRackStore;
