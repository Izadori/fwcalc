const gulp = require("gulp");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify")

gulp.task("uglify", function(done) {
    gulp.src("mychart.js")
	.pipe(uglify())
	.pipe(rename({ extname: ".min.js" }))
	.pipe(gulp.dest("./"));
    done();
});

