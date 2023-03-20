import gulp from "gulp";
import del from "del";
import browserSync from "browser-sync";
import sourcemaps from "gulp-sourcemaps";

import uglify from "gulp-uglify";
import webpack from "webpack-stream";

export default function jsBuild() {
  del("./dist/js/**/*.js");
  return gulp
    .src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(
      webpack({
        mode: app.isDev ? "development" : "production",
        output: {
          filename: "bundle.min.js",
        },
      })
    )
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest(app.path.build.js))
    .pipe(browserSync.reload({ stream: true }));
}
