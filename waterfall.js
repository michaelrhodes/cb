module.exports = waterfall

function waterfall (tasks, cb) {
  var ctx = this
  var end = tasks.length
  var ndx = 0

  next([])

  function next (args) {
    tasks[ndx++].apply(ctx, args.concat(then))
  }

  function then (err) {
    if (err) return cb && cb.call(ctx, err)

    ndx === end ?
    cb && cb.apply(ctx, arguments) :
    next([].slice.call(arguments, 1))
  }
}
