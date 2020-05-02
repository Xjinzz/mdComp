/**
 * @descript array方法类库
 * @author zhenzong.jin@mwcare.cn
 * @version v1.0.0
 * Created by zhenzong.jin on 2020/3/13.
 * 新增
 */
import { objectTool,stringTool,generalTool } from "@tool/commonUtil";
const arrayTool = {
    _private: {
        getIndexByString: function (array, str) {
            let _index = -1;
            for (let i = 0; i < array.length; i++) {
                if (array[i] == str) {
                    _index = i;
                    break;
                }
            }
            return _index;
        },
        getIndexByObject: function (array, obj) {
            let _index = -1;
            for (let i = 0; i < array.length; i++) {
                if (objectTool.equalsObject(array[i], obj)) {
                    _index = i;
                    break;
                }
            }
            return _index;
        },
        removeSingleStr: function (array, str) {
            let _index = this.getIndexByString(array, str);
            if (_index == -1) {
                return array;
            }
            array.splice(_index, 1);
            return array;
        },
        removeSingleObject: function (array, item) {
            let _index = this.getIndexByObject(array, item);
            if (_index == -1) {
                return array;
            }
            array.splice(_index, 1);
            return array;
        },
    },
    isArray(source) {
        return generalTool.getType(source) === 'Array';
    },
    /**
     * @description 深拷贝，支持jsonArray，多维数组
     * @param {Array} array 元数组
     * @returns {Array} 克隆过后的数组
     */
    deepClone(array){
        let _arr = [];
        array.forEach(item => {
            if(objectTool.isObject(item)){
                _arr.push(objectTool.deepClone(item));
            }else if(this.isArray(item)){
                _arr.push(this.deepClone(item));
            }else{
                _arr.push(item);
            }
        })
        return _arr;
    },
   /**
    * @description 获取指定item第一次出现的位置
    * @param {Array} array 要排查的数组
    * @param {*} item 要查找的item
    * @returns {Number} 首次出现的位置，如果未出现则返回-1
    */ 
    findIndex: function (array, item) {
        if (array instanceof Array == false) {
            return -1;
        }
        if (typeof item == "object") {
            return this._private.getIndexByObject(array, item);
        } else if (typeof item == "string" || typeof item == "number") {
            return this._private.getIndexByString(array, item);
        } else {
            return -1;
        }
    },
    /**
    * @description 删除指定的内容的一项（不影响原数组）
    * @param {Array} array 原始数组
    * @param {*} item 要删除的item
    * @returns {Array} 处理过后的数组
    */ 
    removeItem: function (array, items) {
        if (array instanceof Array == false) {
            return;
        }
        let resultArr = arrayTool.deepClone(array)
        if (typeof items == "object") {
            this._private.removeSingleObject(resultArr, items);
        }
        if (typeof items == "string" || typeof item == "number") {
            this._private.removeSingleStr(array, items);
        }
        return resultArr;
    },
    /**
     * @description 数组去重
     * @param {Array} array 要去重的数组
     * @returns {Array} 去重过后的数组,不替换原数组
     */
    unique(array){
        if (array instanceof Array == false) {
            return;
        }
        return array.reduce((count, item) => arrayTool.findIndex(count,item)== -1 ? [...count,item] : count, []);
    },
    /**
     * @description 根据对象的指定key判定去重
     * @param {Array} array 
     * @param {*} field 
     * @returns {Array} 去重过后的数组,不替换原数组
     */
    uniqueByFiled(array, field) {
        if (array instanceof Array == false) {
            return;
        }
        let hash = {};
        return array.reduce(function (item, next) {
            hash[next[field]] ? '' : hash[next[field]] = true && item.push(next);
            return item;
        }, []);
    },
    /**
     * @description 根据对象的指定key生成新数组
     * @param {Array} array 愿数组
     * @param {*} field 字段key
     * @returns {Array} 生成的数组
     */
    getSimpleValuesByField(array,field){
        if (array instanceof Array == false) {
            return [];
        }
        return array.reduce((total,item) => (item[field] != undefined && item[field] != null) ? [...total,item[field]]:total,[]);
    },
    /**
     * @description 数组排序(仅针对一维数字、字符串数组)
     * @param {Array} arr 原数组
     * @param {Boolean} desc 正序还是倒叙，默认正序
     * @returns {Array} 排序的数组
     */
    sort(arr,desc = true) {
        if(arr.length<=1) {
            return arr;
        }
    
        let leftArr = [];
        let rightArr = [];
        let q = arr[0];
        for(let i = 1,l=arr.length; i<l; i++) {
            if(arr[i]>q) {
                rightArr.push(arr[i]);
            }else{
                leftArr.push(arr[i]);
            }
        }
        let result = [].concat(this.sort(leftArr),[q],this.sort(rightArr));
        if(!desc){
            return result.reverse()
        }
        return result;
    },
    /**
     * @description 针对jsonArray的排序（支持字符串、数字等）
     * @param {Array} array 愿数组 
     * @param {String} field json的key
     * @param {Boolean} desc 正序还是倒叙，默认正序
     * @returns 排序后的数组
     */
    sortByField(array, field, desc = true) {
        if (array instanceof Array == false) {
            return [];
        }
        if (array.length <= 1) {
            return array;
        }
        let _arr = arrayTool.deepClone(array);
        _arr.sort(function (a, b) {
            if (desc) {
                return a[field] - b[field];
            } else {
                return b[field] - a[field];
            }
        })
        return _arr;
    },
    /**
     * @description 去掉数组中的null、undefined
     * TODO:NaN暂时无法过滤
     * @param {Array} arr 要被过滤的数组
     * @returns 删除过后的数组
     */
    delVoid(arr){
        let _arr = []
        arr.forEach(item =>{
            if(this.isArray(item)){
                _arr.push(this.delVoid(item));
            }else{
                if(item !== null && item !== undefined){
                    _arr.push(item);
                }
            }
        })
        return _arr;
    },
    deepFlat(arr){
        let _arr = [];
        arr.forEach(item => {
            if(this.isArray(item)){
                _arr = _arr.concat(...this.deepFlat(item));
            }else{
                _arr.push(item);
            }
        })
        return _arr;    
    }
}
export default arrayTool;