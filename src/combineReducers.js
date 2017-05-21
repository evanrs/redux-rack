import _keys from 'lodash-es/keys';
import _reduce from 'lodash-es/reduce';

export function combineReducers(reducers = {}) {
  const reducerKeys = _keys(reducers);

  return (state = {}, action) => {
    const hasChanged = false;
    const nextState = _reduce(
      reducerKeys,
      (nextState, key) => {
        nextState[key] = reducers[key](nextState[key], action);
        hasChanged = hasChanged || nextState[key] !== state[key];
      },
      state
    );

    return hasChanged ? nextState : state;
  };
}

export default combineReducers;
