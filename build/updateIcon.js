/**
 * @Author: Sun Rising
 * @Date: 2020-02-17 16:25:28
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-02-17 17:13:34
 * @Description: 更新图标库
 */
const request = require('request');
const fs = require('fs');
const chalk = require("chalk");

// 待更新文件列表
const updateFileList = [
    'font_747224_5bg39cfwo4q.eot',
    'font_747224_5bg39cfwo4q.woff2',
    'font_747224_5bg39cfwo4q.woff',
    'font_747224_5bg39cfwo4q.ttf',
    'font_747224_5bg39cfwo4q.svg'
]
// 请求路径
const updateUrl = 'https://at.alicdn.com/t/'
// 存放路径
const downDir = './src/renderer/style/depend/iconfont/'


const updateFile = async (_url, filename) => {
    try {
        var fileStream = fs.createWriteStream(downDir + filename);
        var reqStream = await request(_url + filename);
        reqStream.pipe(fileStream)
        console.log(filename + " Update Success ! ");
    } catch (error) {
        console.log(error);
    }
}

// 阿里云图标库
const updateIconfont = async () => {
    for (filename of updateFileList) {
        await updateFile(updateUrl, filename)
    }
    const doneLog = chalk.bgGreen.white(" Iconfont Update Done ! ") + " ";
    console.log(`${doneLog}`);
    process.exit();
}

updateIconfont()