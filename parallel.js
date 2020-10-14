module.exports = parallel

function parallel (max, tasks, cb) {
  var ctx = this
  var res = []
  var ndx = 0
  var running = 0
  var remaining

  if (max.length) {
    cb = tasks
    tasks = max
    max = tasks.length
  }

  next(remaining = tasks.length)

  function next () {
    running < max &&
    tasks[ndx] &&
    tasks[ndx].call(ctx, then())
  }

  function then (n) {
    return ++running, next(n = ndx++), function (err) {
      if (err) return cb && cb.call(ctx, err)

      res[n] = arguments.length > 2 ?
        [].slice.call(arguments, 1) :
        arguments[1]

      --running
      --remaining ? next() :
      cb && cb.apply(ctx, [err, res])
    }
  }
}
