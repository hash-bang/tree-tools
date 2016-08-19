var gulp = require('gulp');
var inject = require('gulp-inject-string');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

gulp.task('default', ['build']);

gulp.task('build', function () {
	gulp.src('./index.js')
		.pipe(rename('ngTreeTools.js'))
		.pipe(inject.wrap('angular.module(\'ngTreeTools\', []).service(\'TreeTools\', function() {\n', '});'))
		.pipe(replace(/^.*require\(.*\);\s+$/gm, ''))
		.pipe(replace(/^var treeTools = .+$/m, 'return {'))
		.pipe(gulp.dest('./dist'));
});
