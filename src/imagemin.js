const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
// const imageminJpegtran = require('imagemin-jpegtran');
// const imageminOptipng = require('imagemin-optipng');

async function compass(input, output, opts, callback) {
    let log = await imageminCompass(input, output, opts);
    callback(log);
}

async function imageminCompass(input, output = 'temp', opts = {}) {
    input = typeof input == 'string' ? [input] : input;

    return await imagemin(input, {
        destination: output,
        plugins: [
            // imageminOptipng({
            //     optimizationLevel: 7
            // }),
            // imageminJpegtran(),
            imageminMozjpeg(opts),
            imageminPngquant({
                speed: 1,
                strip: true,
                quality: [0.4, 0.6],
            }),
            imageminGifsicle({
                optimizationLevel: 3,
            }),
        ],
    })
        .then((file) => {
            return {
                status: true,
                data: file,
            };
        })
        .catch((e) => {
            console.log(e);
            return {
                status: false,
                error: e.toString(),
            };
        });
}

module.exports = {
    compass: compass,
};
