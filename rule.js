'use strict'

var traverse = require('traverse')

module.exports = Rule

function Rule (config) {
  return {
    test: parse(config.test),
    value: config.value
  }
}

function parse (data) {
  return Every(traverse(data).reduce(leaves, []).map(Test))
}

function leaves (acc) {
  return this.isLeaf ? acc.concat(this) : acc
}

function Test (leaf) {
  return function test (data) {
    var expectation = leaf.node
    var actual = traverse(data).get(leaf.path)

    if (typeof expectation !== 'function') {
      return expectation === actual
    }

    return expectation(actual)
  }
}

function Every (fns) {
  return function every (value) {
    return fns.every(function (fn) {
      return fn(value)
    })
  }
}
