# imagemin-electron

[![GitHub release](https://img.shields.io/badge/release-v0.0.1-blue.svg)](https://github.com/zenoslin/imagemin-electron/releases)

用`electron`和`node.js`写的一个压缩图片桌面应用，支持`PNG` `JPG`和`GIF`。

开发思路 -> [传送门🚪](http://www.zenoslin.top/index.php/2019/01/28/imagemin/)

## How to start

``` -shell
git clone https://github.com/zenoslin/tinyPNG-electron.git
npm install
npm run start
```

## 压缩图片代码

``` -js
const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const imageminGifsicle = require('imagemin-gifsicle')

async function compass(input, output, opts, callback) {
    let log = await imageminCompass(input, output, opts)
    callback(log)
}

async function imageminCompass(input, output = 'temp', opts = {}) {
    input = (typeof input == 'string') ? [input] : input;
    return await imagemin(input, output, {
            use: [
                imageminMozjpeg(opts),
                imageminPngquant(opts),
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
```

参考了https://github.com/zoeDylan/z_img

## Todo

- [x] one file drop to tiny
- [ ] log print