const {ipcRenderer} = require('electron')
const imagemin = require('./src/imagemin').compass;
// const tiny = require('./src/tinyPNG')

const inputBtn = document.getElementById('input-btn')
const outputBtn = document.getElementById('output-btn')
const inputPath = document.getElementById('input-path')
const outputPath = document.getElementById('output-path')
const tinyBtn = document.getElementById('tiny-btn')
const logSpan = document.getElementById('log-span')

var _inputPath = './ui'
var _outputPath = "./ui/temp"

inputPath.value = _inputPath
outputPath.value = _outputPath

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

//Js拖入文件
const holder = document.getElementById("holder")

holder.ondragenter = holder.ondragover = (event) => {
    event.preventDefault()
    holder.className = "jumbotron holder-ondrag"
}

holder.ondragleave = (event) => {
    event.preventDefault()
    holder.className = "jumbotron holder"
}

holder.ondrop = (event) => {
    // 调用 preventDefault() 来避免浏览器对数据的默认处理
    //（drop 事件的默认行为是以链接形式打开） 
    event.preventDefault()
    holder.className = "jumbotron holder"
    var file = event.dataTransfer.files[0]
    _inputPath = inputPath.value = file.path
    console.log(_inputPath)
}