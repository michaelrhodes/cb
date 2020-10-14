var queue = require('dexy/queue')()
var assert = require('dexy/assert')
var waterfall = require('../waterfall')

queue(function (done) {
  var tasks = []

  tasks.push(function (cb) {
    soon(() => cb(null, 1, 2))
  })

  tasks.push(function (a, b, cb) {
    soon(() => cb(null, a + b))
  })

  tasks.push(function (num, cb) {
    soon(() => cb(null, num * 2))
  })

  waterfall(tasks, function (err, res) {
    assert('has no error', err, null)
    assert('has expected result', res, 6)
    done()
  })
})

function soon (cb) {
  setTimeout(cb, Math.round(Math.random() * 100))
}
