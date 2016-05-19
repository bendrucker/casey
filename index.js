'use strict'

var find = require('array-find')
var pipe = require('value-pipe')
var get = require('value-get')

var Rule = require('./rule')

module.exports = Ruleset

function Ruleset (rules) {
  rules = rules.map(Rule)

  return function matcher (data) {
    var rule = find(rules, pipe([
      get('test'),
      callWith(data)
    ]))

    if (!rule) return null
    if (typeof rule.value === 'function') return rule.value(data)
    return rule.value
  }
}

function callWith () {
  var args = arguments
  return function wrap (fn) {
    return fn.apply(this, args)
  }
}
