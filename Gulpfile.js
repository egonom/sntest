var gulp = require('gulp');
var outputDir = 'public/assets/summernote';

gulp.task('copy-index', function() {
	gulp.src('index.html')
		.pipe(gulp.dest('public/'))
});

gulp.task('copy-summernote', function() {
	gulp.src('node_modules/summernote/dist/**/*')
		.pipe(gulp.dest(outputDir))
});

gulp.task('copy-plugin', function() {
	gulp.src('vendor/egonom/summernote-uploadfile/dist/uploadfile.js')
		.pipe(gulp.dest(outputDir+'/plugin'))
});

gulp.task('copy-route', function() {
	gulp.src('snroute.php')
		.pipe(gulp.dest('app/'))
});


gulp.task('add-routes', () => {

	var masterRoute = 'app/routes.php';
	var fs = require('fs');
	fs.access(masterRoute, (err) => {
		if (err) {
			console.log(err.message);
			console.log(err.code);
		} else {
			const replace = require('gulp-replace');
			var anchor = '// Add Imports';
			var conc = '\nrequire \'snroute.php\';\n';

			console.log(2, anchor + conc);
			return gulp.src(masterRoute)
				.pipe(replace(anchor, anchor + conc))
				.pipe(gulp.dest('app'));
		}
	});

})


gulp.task('default', ['copy-index', 'copy-summernote', 'copy-plugin', 'copy-route', 'add-routes']);