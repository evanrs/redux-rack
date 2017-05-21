redux-rack
===
_Treat Redux like a rack — mount reducers like components_

### Use
```js
withReducer('foo', (foo, action) => foo)(Component)
```


### Combine
```js
withReducer({
  foo(foo, action) {
    // … reducer logic …
  },
  bar(bar, action) {
    // … reducer logic …
  },
})
```

### Nest
```js
withReducer({
  bar(bar, action) {
    // … reducer logic …
  },
  // Runs after, on nested value
  'bar.baz': (baz, action) => {
    // … reducer logic …
  },
})
```

### Iterate
```js
withReducer({
  // Run for each list item
  'foos[]': (item, action) => {
      // … reducer logic …
  },
  // Run after, for each item property
  'foos[].ball': (property, action) => {
      // … reducer logic …
  },
})
```

### Throw caution to the wind
```js
withReducer((state, action) =>
  // time for something completely different
)
```

# Status
- __withReducer__ signature
  - [x] simple `(key, reducer)`
  - [ ] combined `{ foo, bar }`
  - [ ] nested `{ bar, bar.baz }`
  - [ ] iterative `{ foos[], foos[].prop }`
  - [ ] global, `window.throw(caution)`

- __Development__
  - [ ] stable
  - [x] active
  - [ ] wanting
  - [ ] in need of intervention
