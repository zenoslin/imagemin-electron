const {ipcRenderer} = require('electron')
const fileList = require('./src/tinyPNG')

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
    document.getElementById('selected-file').innerHTML = `你已选择: ${path}`
})

tinyBtn.addEventListener('click', (event) => {
    fileList(uiPath + '/') 
})