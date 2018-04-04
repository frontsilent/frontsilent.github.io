var gulp = require("gulp");
var server = require("browser-sync");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var cssmin = require('gulp-cssmin');
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var run = require("run-sequence");
var del = require("del");

gulp.task("style", function () {
	gulp.src("less/style.less")
		.pipe(plumber())
		.pipe(less())
		.pipe(postcss([
      autoprefixer({
				browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]
			})
    ]))
		.pipe(gulp.dest("css"))
		.pipe(cssmin())
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest("css"))
		.pipe(server.reload({
			stream: true
		}));
});
gulp.task("images", function () {
	return gulp.src("img/**/*.{png,jpg,gif,svg}")
		.pipe(imagemin([
      imagemin.optipng({
				optimizationLevel: 5
			}),
      imagemin.svgo({
				plugins: [
					{
						removeViewBox: false
					},
					{
						cleanupIDs: false
					}
        ]
			}),
      imagemin.jpegtran({
				progressive: true
			})
    ]))
		.pipe(gulp.dest("img"));
});
gulp.task("symbols", function () {
	return gulp.src("build/img/icons/*.svg")
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(rename("sprite.svg"))
		.pipe(gulp.dest("build/img"));
});

gulp.task("serve", function () {
	server.init({
		server: "."
	});

	gulp.watch("less/**/*.less", ["style"]);
	gulp.watch("*.html").on("change", server.reload);
});

gulp.task("copy", function () {
	return gulp.src([
    "fonts/**",
    "img/**",
    "js/**",
    "*.html"
    ], {
			base: "."
		})
		.pipe(gulp.dest("build"));

});

gulp.task("clean", function () {
	return del("build");
});

gulp.task("build", function (fn) {
	run(
		//    "clean",
		//    "copy",
		"style",
		//    "images",
		//    "symbols",
		fn
	);
});