const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
 
gulp.task('imgmin', function () {
    var jpgmin = imageminJpegRecompress({
            accurate: true,//高精度模式
            quality: "high",//图像质量:low, medium, high and veryhigh;
            method: "smallfry",//网格优化:mpe, ssim, ms-ssim and smallfry;
            min: 70,//最低质量
            loops: 0,//循环尝试次数, 默认为6;
            progressive: false,//基线优化
            subsample: "default"//子采样:default, disable;
        }),
        pngmin = imageminOptipng({
            optimizationLevel: 4
        });
    gulp.src("../ui/*.*")
        .pipe(imagemin({
            use: [jpgmin, pngmin]
        }))
        .pipe(gulp.dest("dist/img"));
});