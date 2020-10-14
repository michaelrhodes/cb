module.exports = until

function until (fn, args, cb) {
  var ctx = this
  var end = args.length
  var ndx = 0

  next()

  function next () {
    fn.call(ctx, args[ndx++], then)
  }

  function then (err) {
    ndx === end || err == null ?
    cb && cb.apply(ctx, arguments) :
    next()
  }
}
