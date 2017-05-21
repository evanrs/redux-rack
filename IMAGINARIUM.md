# Imagining a better tomorrow™


### No Redux, no Problem!

```js
withRack({
  stage() {
    // stage reducer for mount
  },
  mount() {
    // mount reducer, or complete 'stage'
  },
  unmount() {
    // unmount reducer
  },
})
```

### Middleware

Mount middleware against action types
```js
withMiddleware(ACTION_TYPE, (store, action, next) => {})
```

Mount middleware against action shapes
```js
withMiddleware({ type: ACTION_TYPE }, (store, action, next) => {})
```

Mount middleware against a list of action types or shapes
```js
withMiddleware([...actionTypes], (store, action, next) => {})
```

Localize middleware state to manage side effects
```js
// provide a reducer
withMiddleware(
  [...actionTypes],
  // middleware
  (store, action, next) => {}
  (action, state) => {}
)
```


### Intercept
Intercept dispatches from a component tree
```js
withIntercept(actionTypes, (store, action, next) => {})
```
Localize intercept state to implement debounce or throttle
```js
withIntercept([...actionTypes],
  // middleware
  (store, action, next) => {},
  // reducer
  (state, action) => {},
)
```


### Unit
Get real crazy and describe state shapes with component notation. Generate actions by their handlers. Delegate action/state behavior to other units.
```js
<Unit
  local
  key="people"
  onAddPerson(state, action) {
    return <PersonUnit action={action}/>
  }
  onRemovePerson(state, removePersonAction) {
    return null;
  }
/>
```

# Questionable Value
### Action
Convenience methods for action creators
```js
withAction({
  type: 'SET_FOO',
  name: 'setFoo',
  payload: (args) => args
}),

withAction({
  setFoo: {
    type: 'SET_FOO',
    payload: (args) => args
  }
})
```
