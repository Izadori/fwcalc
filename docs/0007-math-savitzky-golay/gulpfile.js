const gulp = require("gulp");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify")

gulp.task("concat", function(done) {
    gulp.src(["mychart-1.js", "mychart-2.js", "mychart-3.js"])
	.pipe(concat("mychart.concat.js"))
	.pipe(gulp.dest("./"));
    done();
});

gulp.task("uglify", function(done) {
    gulp.src("mychart.concat.js")
	.pipe(uglify())
	.pipe(rename({ extname: ".min.js" }))
	.pipe(gulp.dest("./"));
    done();
});

