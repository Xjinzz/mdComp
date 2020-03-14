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
     * @description 节流，一定时间内只执行一次
     * @param {Fcuntion}} 要节流的函数
     * @param {Number} wait 节流等待时间
     * @returns {Function} 节流过后的函数
     * @example 
     *      debounce(function(){},100)
     */
    debounce(fn, wait = 500) {
        var timeout = null;    
        return function() {        
            if(timeout !== null)   clearTimeout(timeout);        
            timeout = setTimeout(fn, wait);    
        }
    },
    /**
     * @description 防抖，操作间隔多久之后在调用，如果有调用则重置时间
     * @param {Fcuntion}} 要节流的函数
     * @param {Number} wait 节流等待时间
     * @returns {Function} 节流过后的函数
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