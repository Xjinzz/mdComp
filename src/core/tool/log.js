/**
 * @descript log方法类库
 * @author zhenzong.jin@mwcare.cn
 * @version v1.0.1
 * TODO: 需要补充tips和confirm的样式，应该为一个组件类似的
 * Created by zhenzong.jin on 2020/3/13.
 * 新增
 * updateBy zhenzong.jin 2020.03.14
 * 区分对象和数组无法设置颜色  否则会打印[object object]
 */
import Enum from "@tool/enum";
export default {
    _private:{
        /**
        * @param color 日志颜色
        * @param arr 日志参数
        * @private
        */
        _log(color, arr) {
            arr.map((x) => {
                if(Object.prototype.toString.call(x) != "[object Object]" && Object.prototype.toString.call(x) != "[object Array]"){
                    console.log(`%c ${x}`,`color:${color}`);
                }else{
                    console.log(x);
                }
            })
        }
    },
    /** 输出红色日志 */
    error() {
        if (arguments.length > 0) {
            let arr = Array.prototype.slice.call(arguments);
            this._private._log(Enum.logColor.error, arr);
        }
    },
    /** 输出黄色日志 */
    warning() {
        if (arguments.length > 0) {
            let arr = Array.prototype.slice.call(arguments);
            this._private._log(Enum.logColor.warning, arr);
        }
    },
    /** 输出绿色日志 */
    success() {
        if (arguments.length > 0) {
            let arr = Array.prototype.slice.call(arguments);
            this._private._log(Enum.logColor.success, arr);
        }
    },
    /** 输出黑色正常日志 */
    info() {
        if ( arguments.length > 0) {
            let arr = Array.prototype.slice.call(arguments);
            this._private._log(Enum.logColor.info, arr);
        }
    },
    /* 提示 */
    tips(msg) {
        alert(msg);
    },
    /* 确认提示框 */
    confirm(msg,confirmCb,cancelCb) {
        if(confirm(msg)){
            confirmCb && confirmCb();
        }else{
            cancelCb && cancelCb();
        }
    }
    
}