var queue = require('dexy/queue')()
var assert = require('dexy/assert')
var parallel = require('../parallel')

queue(function (done) {
  parallel([1, 2, 3].map(doubler), function (err, res) {
    assert('has no error', err, null)
    assert('has results', Array.isArray(res))
    assert('has expected result[0]', res[0], 2)
    assert('has expected result[1]', res[1], 4)
    assert('has expected result[2]', res[2], 6)
    assert('has expected result count', res.length, 3)
    done()
  })
})

queue(function (done) {
  parallel([1, 2, 3].map(troubler), function (err, res) {
    assert('has error', err)
    assert('has no results', res, void 0)
    done()
  })
})

queue(function (done) {
  var start = Date.now()

  parallel(2, [1, 2, 3].map(tripler), function (err, res) {
    var time = Date.now() - start
    assert('has no error', err, null)
    assert('had max concurrency', time <= 200 || time <= 216)
    assert('has expected result[0]', res[0], 3)
    assert('has expected result[1]', res[1], 6)
    assert('has expected result[2]', res[2], 9)
    assert('has expected result count', res.length, 3)
    done()
  })
})

function doubler (num) {
  return function (cb) {
    soon(function () {
      cb(null, num * 2)
    })
  }
}

function troubler (num) {
  return function (cb) {
    soon(function () {
      num % 2 ?
      cb(null, num * 2) :
      cb(new Error)
    })
  }
}

function tripler (num) {
  return function (cb) {
    setTimeout(cb, 100, null, num * 3)
  }
}

function soon (cb) {
  setTimeout(cb, Math.round(Math.random() * 100))
}
