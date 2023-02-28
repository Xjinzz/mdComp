/**
 * created by jinzhenzong 2020-03-20
 * @desc 只许可调用commonUtil
 * @version v1.0.0
 * @author zhenzong.jin@mwcare.cns
 */

import arrayTool from "@tool/arrayTool";
import stringTool from "@tool/stringTool";
import dateTool from "@tool/dateTool";
import objectTool from "@tool/objectTool";
import cookieTool from "@tool/cookieTool";
import mathTool from "@tool/mathTool";
import validateTool from "@tool/validate";
import logTool from "@tool/log";

const generalTool = {
    /**
     * @description 防抖，操作间隔多久之后在调用，如果有调用则重置时间
     * @param {Fcuntion}} 要防抖的函数
     * @param {Number} wait 防抖等待时间
     */
    debounce(fn, wait = 500) {
        var timeout = null;    
        return function() {        
            if(timeout !== null)   clearTimeout(timeout);        
            timeout = setTimeout(fn.bind(fn.prototype, ...arguments), wait);    
        }
    },
    /**
     * @description 节流，一定时间内只执行一次
     * @param {Fcuntion}} 要节流的函数
     * @param {Number} wait 节流等待时间
     * @example 
     *      debounce(function(){},100)
     */
    throttle(func, delay = 500) {
        var timer = null;            
        return function() {                
            var context = this;               
            var args = arguments;                
            if (!timer) {                    
                timer = setTimeout(function() {                        
                    func.apply(context, args);                        
                    timer = null;                    
                }, delay);                
            }            
        }        
    },
    /**
     * @description 获取数据的类型
     * @param {*} x
     * @returns {String}
     *     Object/String/Number/Array/Function/Date
     */
    getType (x) {
        return Object.prototype.toString.call(x).slice(8, -1);
    },
    /**
     * @description 比较两个版本号
     * @params {String} v1 第一个version
     * @params {String} v2 第二个version
     * @returns {Boolean} 第一个如果比第二个大则返回true/否则返回false
     */
    compareVersion(v1,v2){
        const arr1 = v1.split('.')
        const arr2 = v2.split('.')
        const length1 = arr1.length
        const length2 = arr2.length
        const minlength = Math.min(length1, length2)
        let i = 0
        for (i ; i < minlength; i++) {
            let a = parseInt(arr1[i])
            let b = parseInt(arr2[i])
            if (a > b) {
            return true
            } else if (a < b) {
            return false
            }
        }
        if (length1 > length2) {
            for(let j = i; j < length1; j++) {
            if (parseInt(arr1[j]) != 0) {
                return true
            }
            }
            return false
        } else if (length1 < length2) {
            for(let j = i; j < length2; j++) {
            if (parseInt(arr2[j]) != 0) {
                return false
            }
            }
            return false
        }
        return false
    }
}

export {
    arrayTool,
    stringTool,
    dateTool,
    objectTool,
    cookieTool,
    mathTool,
    generalTool,
    validateTool,
    logTool
}