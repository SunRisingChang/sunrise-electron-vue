/**
 * @Author: Sun Rising
 * @Date: 2020-02-17 16:25:28
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-17 14:19:47
 * @Description: 更新图标库
 */
const fs = require('fs');
const chalk = require("chalk");
let request = require("request");

const iconfontId = require('../package.json').iconfontId;
if (iconfontId) {
    const baseUrl = 'http://at.alicdn.com/t/';
    const downFile = './src/renderer/style/depend/iconfont/index.css'
    request(baseUrl + iconfontId + '.css', (error, response) => {
        if (error) {
            console.log(error);
            return;
        }
        fs.writeFile(downFile, response.body, (error2) => {
            if (error2) {
                console.log(error2);
                return;
            }
            console.log(chalk.bgGreen.white("Iconfont Update Done!"));
        })
    })
} else {
    console.log(chalk.red.white("No iconfontId found in package.js!"));
}
