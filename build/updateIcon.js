/**
 * @Author: Sun Rising
 * @Date: 2020-02-17 16:25:28
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-09 15:00:21
 * @Description: 更新图标库
 */
const http = require('http');
const fs = require('fs');
const chalk = require("chalk");

// 待更新文件列表
const updateFileList = [
    'font_747224_62nz49y6ivm.css'
]
// 请求路径
const updateUrl = 'http://at.alicdn.com/t/'
// 存放路径
const downDir = './src/renderer/style/depend/iconfont/'

function goHttp(url) {
    let promise = new Promise(function (resolve, rejecte) {
        let req = http.get(url)
        req.on("response", function (res) {
            let finalData = '';
            res.on("data", function (data) {
                finalData += data;
            });
            res.on('end', function (date) {
                resolve(finalData.toString())
            })
        });
    })
    return promise;
}

const updateFile = async (_url, filename) => {
    try {
        var reqStream = await goHttp(_url + filename);
        // var fileStream = fs.createWriteStream(downDir + filename);
        fs.writeFile(_url + filename, reqStream, { 'flag': 'a' }, function (err) { })
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