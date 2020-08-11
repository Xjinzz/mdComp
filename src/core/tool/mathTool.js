/**
 * @descript math方法类库
 * @author zhenzong.jin@mwcare.cn
 * @version v1.0.0
 * Created by zhenzong.jin on 2020/3/13.
 * 新增
 */
import { generalTool } from "@tool/commonUtil";
export default {
    isNumber(num){
        return generalTool.getType(num) === 'Number';
    },
    /**
     * @description 获取指定范围内的随机数
     * @param {Number} min 起始
     * @param {Number} max 结束
     * @param {Number} num 保留位数 默认不限制
     * @return {Number} 随机数字
     */
    random (min,max,num = 2) {
        let number = min + Math.random() * ( (max+1) - min );
        if(num && this.isNumber(num)){
            number.toFixed(num);
        }
        return number;
    },
    /**
     * @description 获取较为准确的除法
     * @param {Number} arg1 
     * @param {Number} arg2 
     */
    div(arg1, arg2) {
        var t1 = 0,
          t2 = 0,
          r1,
          r2;
        try {
          t1 = arg1.toString().split(".")[1].length;
        } catch (e) {
          t1 = 0;
        }
        try {
          t2 = arg2.toString().split(".")[1].length;
        } catch (e) {
          t2 = 0;
        }
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return this.mul(r1 / r2, Math.pow(10, t2 - t1));
    },
    /**
     * @description 获取较为准确的乘法
     * @param {Number} arg1 
     * @param {Number} arg2 
     */
    mul(arg1, arg2) {
        var m = 0,
          s1 = arg1.toString(),
          s2 = arg2.toString();
        try {
          m += s1.split(".")[1].length;
        } catch (e) {
          m = 0;
        }
        try {
          m += s2.split(".")[1].length;
        } catch (e) {
          m = m || 0;
        }
        return (
          (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
          Math.pow(10, m)
        );
    },
    /**
     * @description 获取较为准确的加法
     * @param {Number} arg1 
     * @param {Number} arg2 
     */
    add(arg1, arg2) {
        var r1, r2, m, n;
        try {
          r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
          r1 = 0;
        }
        try {
          r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
          r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = r1 >= r2 ? r1 : r2;
        return ((arg1 * m + arg2 * m) / m).toFixed(n);
    },
    /**
     * @description 获取较为准确的减法
     * @param {Number} arg1 
     * @param {Number} arg2 
     */
    sub(arg1, arg2) {
        var r1, r2, m, n;
        try {
          r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
          r1 = 0;
        }
        try {
          r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
          r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        //动态控制精度长度
        n = r1 >= r2 ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    /**
     * @description 将数字转换为大写
     * @param {Number} num 要处理的数字
     */
    toUpperCase (num) {
        var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
        var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
        var a = ("" + num).replace(/(^0*)/g, "").split("."),
            k = 0,
            re = "";
        for(var i = a[0].length - 1; i >= 0; i--) {
            switch(k) {
                case 0:
                    re = BB[7] + re;
                    break;
                case 4:
                    if(!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
                        .test(a[0]))
                        re = BB[4] + re;
                    break;
                case 8:
                    re = BB[5] + re;
                    BB[7] = BB[5];
                    k = 0;
                    break;
            }
            if(k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
                re = AA[0] + re;
            if(a[0].charAt(i) != 0)
                re = AA[a[0].charAt(i)] + BB[k % 4] + re;
            k++;
        }
    
        if(a.length > 1) // 加上小数部分(如果有小数部分)
        {
            re += BB[6];
            for(var i = 0; i < a[1].length; i++)
                re += AA[a[1].charAt(i)];
        }
        if(re == '一十')
            re = "十";
        if(re.match(/^一/) && re.length == 3)
            re = re.replace("一", "");
        return re;
    }
}