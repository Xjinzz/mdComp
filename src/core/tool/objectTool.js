/**
 * @description object方法类库
 * @author zhenzong.jin@mwcare.cn
 * @version v1.0.0
 * Created by zhenzong.jin on 2020/3/13.
 * 新增
 */
import { generalTool } from "@tool/commonUtil";
export default {
    /**
     * @description 判断是否是json
     * @param {Object} source 
     * @returns {Boolean} true/false
     */
    isObject(source) {
        return generalTool.getType(source) === 'Object';
    },
    /**
     * @description 比较两个json是否完全一致
     * @param {Object} source 第一个json
     * @param {Object} target 第二个json
     * @returns {Boolean} 结果
     */
    equalsObject(source,target){
        let p;
        for (p in source) {
            if (typeof (target[p]) == 'undefined') {
                return false;
            }
        }

        for (p in source) {
            if (source[p]) {
                switch (typeof (source[p])) {
                    case 'object':
                        if (!this.equalsObject(source[p], target[p])) {
                            return false;
                        }
                        break;
                    case 'function':
                        if (typeof (target[p]) == 'undefined' ||
                            (p != 'equals' && source[p].toString() != target[p].toString()))
                            return false;
                        break;
                    default:
                        if (source[p] != target[p]) {
                            return false;
                        }
                }
            } else {
                if (target[p])
                    return false;
            }
        }

        for (p in target) {
            if (typeof (source[p]) == 'undefined') {
                return false;
            }
        }

        return true;
    },
    /**
     * @description 深拷贝json
     * @param {Object} source json
     * @returns {Object} 克隆过后的json
     */
    deepClone(source){
        if(source){
            return JSON.parse(JSON.stringify(source));
        }
        return {};
    },
    /**
     * @description 获取key的集合
     * @param {Object} source 
     * @returns {Array} key的集合
     */
    getKeyList(source){
        let res = [];
        if(!source){
            return res;
        }
        for(let i in source){
            res.push(i);
        }
        return res;
    },
    /**
     * @description 深冻结
     * @param {Object} source
     */
    deepFreeze(source){
        let prop,propKey;
        Object.freeze(source);//首先冻结第一层对象
        for(propKey in source){
            prop = source[propKey];
            if(!source.hasOwnProperty(propKey) || !(typeof prop === "object") || Object.isFrozen(prop)){
                continue;
            }
            this.deepFreeze(prop);//递归
        }
    },
    /**
     * @description 转query的string a=1&b=1
     * @param {Object} source 要转化的对象
     * @param {String} splitTag 每一项分割的tag
     * @returns {String} 转换过后的字符串
     */
    toQueryString(source,splitTag = "&"){
        if(this.isObject(source)){
            return false;
        }
        let str = "";
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                str= str + splitTag + key + "=" + source[key]
            }
        }
        str = str.substring(1);
        return str;
    },
    /**
     * @descript 将对象转化为jsonArray {a:1} => [{key:a,value:1}]
     * @param {Object} source 要处理的对象
     * @param {String} keyname key的name默认为key
     * @param {String} valuename value的name默认为value
     * @example 
     *  objectTool.toJsonArray(obj,null,"a") 将返回[{key:xxx,a:xxx}]
     */
    toJsonArray(data,keyname,valuename){
        let arr = [];
        keyname = keyname ? keyname : "key";
        valuename = valuename ? valuename : "value";
        for (const key in data) {
            let obj = {};
            obj[keyname] = key;
            obj[valuename] = data[key]
            arr.push(obj);
        }
        return arr;
    },
    /**
     * @description 检查一个对象是否为空
     * @param {Object} source 要判断的对象
     * @returns {Boolean} 返回true/false
     */
    isEmptyObj(source){
        if (!!Object.getOwnPropertySymbols(source).length) {
            return false
        }
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                return false
            }
        }
        return true
    }
}