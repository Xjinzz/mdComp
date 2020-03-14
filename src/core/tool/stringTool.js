/**
 * @description string方法类库
 * @author zhenzong.jin@mwcare.cn
 * @version v1.0.0
 * Created by zhenzong.jin on 2020/3/13.
 * 新增
 */
import { generalTool } from "@tool/commonUtil";
const specReg = "[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】「」‘；：”“'。，、？ ]";
export default {
    isString(source) {
        return generalTool.getType(source) === 'String';
    },
    /**
     * @description 替换整段文字中的制定字符
     * @param {String} source 原文字 
     * @param {String} findText 要被替换的文字
     * @param {String} replaceText 要变为的文字
     * @returns {String} 处理之后的字符串
     */
    replaceAll(source, findText, replaceText) {
        let regExp = new RegExp(findText, "g");
        return source.replace(regExp, replaceText);
    },
    /**
     * @description 判断是不是jsonStr
     * @param {String} str 字符串
     * @returns {Boolean}
     */
    isJSON(source) {
        if (this.isString(source)) {
            try {
                var obj=JSON.parse(source);
                if(typeof obj == 'object' && obj ){
                    return true;
                }else{
                    return false;
                }
    
            } catch(e) {
                return false;
            }
        }
        return false;
    },
    /**
     * @description 去掉字符串中的空格
     * @param {String} 字符串
     * @param {Number} type 1-所有空格  2-前后空格  3-前空格 4-后空格 default = 1
     */
    trim (source, type = 1) {
        switch (type) {
            case 1:
                return source.replace(/\s+/g, "");
            case 2:
                return source.replace(/(^\s*)|(\s*$)/g, "");
            case 3:
                return source.replace(/(^\s*)/g, "");
            case 4:
                return source.replace(/(\s*$)/g, "");
            default:
                return source;
        }
    },
    /**
     * @description 去掉所有特殊字符
     * @param {String} source
     * @returns {String} 处理之后的字符串
     */
    replaceAllSpec(source){ 
        if(this.checkSpec(source)){
            var pattern = new RegExp(specReg) 
            var rs = ""; 
            for (var i = 0; i < source.length; i++) { 
                rs = rs+source.substr(i, 1).replace(pattern, ''); 
            } 
            return rs; 
        }
        return source;
    },
    /**
     * @description 判断是否有特殊字符
     * @param {String} source
     * @returns {Boolean} true/false
     */
    checkSpec(source){
        let reg = new RegExp(specReg);
        return reg.test(source);
    },
    /**
     * @description 字符串去重
     * @param {String} source 
     * @returns 处理之后的字符串
     */
    unique(source){
        var result = '';
        for (var i = 0; i < source.length; i++) {
            if (result.includes(source[i])) {
                continue;
            }
            result += source[i];
        }
        return result;
    },
    /**
     * @description 获取字符串中各字符出现次数
     * @param {String} source 
     * @returns {Object} “avac” => {a:2,v:1,c:1}
     */
    getCount(source){
        var obj = {};
        for(var i = 0, l = source.length,k; i < l ;i++){
            k = source.charAt(i);
            if(obj[k]){
                obj[k]++;
            }else{
                obj[k] = 1;
            }
        }
        return obj;
    },
    /**
     * @description 获取出现字符最多的一个字符
     * @param {String} source 字符串
     * @returns {Object} 'aabbbb' => {key:"b",value:4}
     */
    getMaxCount(source){
        var obj = this.getCount(source);
        let [value,key] = [0,null];
        for(var k in obj){
            if(obj[k] > value){
                value = obj[k];
                key = k;
            }
        }
        return {key,value}
    },
    /**
     * @description 获取出现字符最少的一个字符
     * @param {String} source 字符串
     * @returns {Object} 'aabbbb' => {key:"a",value:2}
     */
    getMinCount(source){
        var obj = this.getCount(source);
        let [value,key] = [9999,null];
        for(var k in obj){
            if(obj[k] < value){
                value = obj[k];
                key = k;
            }
        }
        return {key,value}
    },
    /**
     * @description 获取第n次出现指定字符的位置,从0开始
     * @param {String} source 字符串
     * @param {String} key 要查找的字符
     * @param {Number} num 第n个
     * @returns {Number} 位置（从0开始）未找到返回-1
     */
    findIndex(source,key,num = 0){
        var x=source.indexOf(key);
        for(var i=0;i<num;i++){
            x=source.indexOf(key,x+1);
        }
        return x;
    }
    

}