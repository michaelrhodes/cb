module.exports = series

function series (tasks, cb) {
  var ctx = this
  var end = tasks.length
  var ndx = 0
  var res = []

  next()

  function next () {
    tasks[ndx++].call(ctx, then)
  }

  function then (err) {
    if (err) return cb && cb.call(ctx, err)

    res.push(
      arguments.length > 2 ?
      [].slice.call(arguments, 1) :
      arguments[1]
    )

    ndx === end ?
    cb && cb.apply(ctx, [err, res]) :
    next()
  }
}
