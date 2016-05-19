# casey [![Build Status](https://travis-ci.org/bendrucker/casey.svg?branch=master)](https://travis-ci.org/bendrucker/casey)

> Declare a ruleset and return values based on the first match


## Install

```
$ npm install --save casey
```


## Usage

```js
var Rules = require('casey')

var match = Rules([
  {
    test: {
      user: {
        username: 'bendrucker'
      }
    }
    value: true
  },
  {
    test: {
      user: {
        username: Boolean
      }
    },
    value: (data) => data.username
  }
])

match({user: {username: 'bendrucker'}})
//=> true

match({user: {username: 'johnsmith'}})
//=> johnsmith

match({user: {username: false}})
//=> null
```

## API

#### `Rules(rules)` -> `function`

Returns a matching function that you can call with nested data. The matching function returns using the first rule where the configured `test` passes.

Each rule has:

###### test

*Required*  
Type: `object`

An expectation that will be checked against data passed to the matcher. The test object will be checked for deep equality against the input data. Any property defined in the test must be found in the source data (and be strictly equal) or the test fails. Leaf nodes in your test object can also be functions. These will be called with the value from the input data at the same path and should return true/false to cause the test to pass or fail.

###### value

*Required*  
Type: `any` / `function`

A value to return when that rule's `test` passes. If the value is a function, it will be called with the input data and the return value will be returned. Otherwise the value itself is returned.

## License

MIT © [Ben Drucker](http://bendrucker.me)
