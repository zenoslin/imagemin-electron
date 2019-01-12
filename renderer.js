const {ipcRenderer} = require('electron')
const imagemin = require('./src/imagemin').compass;
// const tiny = require('./src/tinyPNG')

const inputBtn = document.getElementById('input-btn')
const outputBtn = document.getElementById('output-btn')
const inputPath = document.getElementById('input-path')
const outputPath = document.getElementById('output-path')
const tinyBtn = document.getElementById('tiny-btn')
const logSpan = document.getElementById('log-span')

const btnAAA = document.getElementById('aaa')

var _inputPath = './ui'
var _outputPath = "./ui/temp"

inputBtn.addEventListener('click', (event) => {
    console.log('点击输入按钮')
    ipcRenderer.send('open-file-dialog-input')
})

outputBtn.addEventListener('click', (event) => {
    console.log('点击输出按钮')
    ipcRenderer.send('open-file-dialog-output')
})

ipcRenderer.on('input-path', (event, path) => {
    console.log(`收到完成信息 ${path}`)
    _inputPath = path
    inputPath.value = `${path}`
})

ipcRenderer.on('output-path', (event, path) => {
    console.log(`收到完成信息 ${path}`)
    _outputPath = path
    outputPath.value = `${path}`
})

tinyBtn.addEventListener('click', (event) => {
    _inputPath = inputPath.value
    _outputPath = outputPath.value
    imagemin(_inputPath, _outputPath)
    logSpan.innerHTML = "压缩完成"
})