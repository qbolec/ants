var fs = require('fs');
var _ = require('./js/lib/underscore.js');
var template = fs.readFileSync('/dev/stdin').toString();
var deps = _(template.match(/app\.templates\.get\('([^)]+)'\)/g)).uniq().map(function(dep){
  return 'jst/' + dep.match(/app\.templates\.get\(['"]([^)]+)['"]\)/)[1];
});
deps.push('ts/templates');
_.each(deps,function(dep){
    console.log('/// <reference path="../' + dep + '.ts" />\n');
});
var source = 'Templates.templates["' + process.argv[2] + '"] = ' +  _.template(template,undefined,{
  variable: 'd',
}).source;
console.log(source);
