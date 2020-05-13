/**
 * @Author: Sun Rising 
 * @Date: 2020-05-08 11:52:53 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-05-08 12:10:21
 * @Description: 判空过滤器
 * 
 * null|empty  ==>  "——"
 * ""|empty  ==>  "——"
 * null|empty("0.00")  ==>  "0.00"
 * 
 */
export default {
    name: 'empty',
    /**
     * 
     * @param {*} val 处理的值
     * @param {*} defVal val为空时的返回值
     */
    handle(val, defVal = '——') {
        return val || defVal
    }
}