const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const imageminGifsicle = require('imagemin-gifsicle')

async function compass(input, output) {
    return await imageminCompass(input, output);
}

async function imageminCompass(input, output = 'temp') {
    input = (typeof input == 'string') ? [input] : input;
    return await imagemin(input, output, {
            use: [
                imageminMozjpeg(),
                imageminPngquant(),
                imageminGifsicle({
                    optimizationLevel:3
                })
            ]
        })
        .then(file => {
            return {
                status: true,
                data: file
            };
        })
        .catch(e => {
            console.log(e);
            return {
                status: false,
                error: e.toString()
            }
        });
}

module.exports = {
    compass: compass
};