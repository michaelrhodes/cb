!function(n){"module"in this?module.exports=n():runWaterfall=n()}(function(){return function(n,t){var l=this,c=n.length,i=0;function u(t){n[i++].apply(l,t.concat(o))}function o(n){if(n)return t&&t.call(l,n);i===c?t&&t.apply(l,arguments):u([].slice.call(arguments,1))}u([])}});
