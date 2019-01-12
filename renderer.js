const {ipcRenderer} = require('electron')
const imagemin = require('./src/imagemin').compass;
// const tiny = require('./src/tinyPNG')

const selectDirBtn = document.getElementById('select-directory')
const tinyBtn = document.getElementById('tiny-btn');

var uiPath = './ui'

selectDirBtn.addEventListener('click', (event) => {
    console.log('点击按钮')
    ipcRenderer.send('open-file-dialog')
})

ipcRenderer.on('selected-directory', (event, path) => {
    console.log(`收到完成信息 ${path}`)
    uiPath = path
    document.getElementById('selected-file').value = `${path}`
})

tinyBtn.addEventListener('click', (event) => {
    imagemin(uiPath, uiPath + "/temp"); 
    console.log('压缩完成')
})