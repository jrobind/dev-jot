var gulp = require("gulp");
var concat = require("gulp-concat");

gulp.task("pack-js", function () {
  return gulp
    .src(["public/js/index.js"])
    .pipe(concat("bundle.js"))
    .pipe(gulp.dest("public/build/js"));
});

gulp.task("pack-css", function () {
  return gulp
    .src(["public/css/style.css"])
    .pipe(concat("stylesheet.css"))
    .pipe(gulp.dest("public/build/css"));
});

gulp.task("default", gulp.series(["pack-js", "pack-css"]));
