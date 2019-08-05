var babel = require('gulp-babel');
var gulp = require('gulp');
var gutil = require('gulp-util');
var inject = require('gulp-inject-string');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');

gulp.task('build', ()=>
	gulp.src('./index.js')
		.pipe(plumber({
			errorHandler: function(err) {
				gutil.log(gutil.colors.red('ERROR DURING JS BUILD'));
				process.stdout.write(err.stack);
				this.emit('end');
			},
		}))
		.pipe(rename('tree-tools.js'))
		.pipe(replace(/^.*require\(.*\);\s+$/gm, ''))
		.pipe(replace(/^var treeTools = .+$/m, 'window.TreeTools = {'))
		.pipe(replace(/treeTools/g, 'TreeTools'))
		.pipe(babel({
			presets: ['@babel/env'],
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(uglify())
		.pipe(rename('tree-tools.min.js'))
		.pipe(gulp.dest('./dist'))
);

gulp.task('build:ng', ()=>
	gulp.src('./index.js')
		.pipe(plumber({
			errorHandler: function(err) {
				gutil.log(gutil.colors.red('ERROR DURING JS BUILD'));
				process.stdout.write(err.stack);
				this.emit('end');
			},
		}))
		.pipe(rename('ngTreeTools.js'))
		.pipe(inject.wrap('angular.module(\'ngTreeTools\', []).service(\'TreeTools\', function() {\n', '});'))
		.pipe(replace(/^.*require\(.*\);\s+$/gm, ''))
		.pipe(replace(/^var treeTools = .+$/m, 'var treeTools;\nreturn treeTools = {'))
		.pipe(babel({
			presets: ['@babel/env'],
			plugins: ['angularjs-annotate'],
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(uglify())
		.pipe(rename('ngTreeTools.min.js'))
		.pipe(gulp.dest('./dist'))
);

gulp.task('build', gulp.parallel('build', 'build:ng'));
gulp.task('default', gulp.series('build'));
