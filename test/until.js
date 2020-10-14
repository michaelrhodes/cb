var queue = require('dexy/queue')()
var assert = require('dexy/assert')
var equal = require('dexy/equal')
var until = require('../until')

queue(function (done) {
  until(even, [1, 2, 3], function (err, res) {
    assert('has no error', err, null)
    assert('has expected result', res, 2)
    done()
  })
})

queue(function (done) {
  until(decimal, [1, 2, 3], function (err, res) {
    assert('has error', err)
    assert('has no result', res, void 0)
    done()
  })
})

queue(function (done) {
  var args = [[1, 2, 3], [2, 4, 6], [4, 5, 6]]
  until(evens, args, function (err, res) {
    assert('has no error', err, null)
    assert('has expected result', equal(res, [2, 4, 6]))
    done()
  })
})

function even (num, cb) {
  soon(function () {
    num % 2 ?
    cb(new Error) :
    cb(null, num)
  })
}

function decimal (num, cb) {
  soon(function () {
    num % 1 ?
    cb(null, num) :
    cb(new Error)
  })
}

function evens (nums, cb) {
  soon(function () {
    nums.filter(num => num % 2).length ?
    cb(new Error) :
    cb(null, nums)
  })
}

function soon (cb) {
  setTimeout(cb, Math.round(Math.random() * 100))
}
