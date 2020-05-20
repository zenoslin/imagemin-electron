const {ipcRenderer} = require('electron')
const imagemin = require('./src/imagemin').compass;

const inputBtn = document.getElementById('input-btn')
const outputBtn = document.getElementById('output-btn')
const inputPath = document.getElementById('input-path')
const outputPath = document.getElementById('output-path')
const tinyBtn = document.getElementById('tiny-btn')
const tinySpan = document.getElementById('tiny-span')
const compassInput = document.getElementById('compression')

let _inputPath = '/Users/zenoslin/Documents'
let _outputPath = '/Users/zenoslin/Downloads'
let _opts = {quality: 95}

inputPath.value = _inputPath
outputPath.value = _outputPath
compassInput.value = _opts.quality

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
    tinySpan.innerHTML = "开始压缩"
    _inputPath = inputPath.value
    _outputPath = outputPath.value
    _opts.quality = compassInput.value
    imagemin(_inputPath, _outputPath, _opts, (log) => {
        console.log(log)
        tinySpan.innerHTML = "压缩完成"
    })
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