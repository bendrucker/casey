'use strict'

var test = require('tape')
var Rules = require('./')

test(function (t) {
  var match = Rules([
    {
      test: {
        foo: {
          bar: 'baz'
        }
      },
      value: JSON.stringify
    },
    {
      test: {
        foo: 'bar',
        bar: 'baz'
      },
      value: 'v'
    },
    {
      test: {
        foo: (value) => value === 'bar'
      },
      value: Boolean
    }
  ])

  t.equal(match({foo: {bar: 'baz'}}), '{"foo":{"bar":"baz"}}', 'returns value from first match')
  t.equal(match({foo: 'bar', bar: 'baz'}), 'v', 'can use static value')
  t.equal(match({foo: 'bar'}), true, 'can use custom fn matcher')
  t.equal(match({}), null, 'returns null on no match')

  t.end()
})
