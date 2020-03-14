/**
 * @descript date方法类库
 * @author zhenzong.jin@mwcare.cn
 * @version v1.0.1
 * Created by zhenzong.jin on 2020/3/13.
 * 新增
 * updateBy zhenzong.jin 2020.03.14
 *  修改duration 支持传入时间戳进行比较,修复compare比较失败
 */
export default {
    isDate(val){
        if (!val) return false;
        if (new Date(val) == "Invalid Date") return false;
        return true;
    },
    getCurrentTimeStamp(){
        return new Date().valueOf()
    },
    /**
     * @description 获取yy-mm-dd,需要传入能被new Date()解析的时间
     * @param {Date} val 默认为当前
     * @returns {String} formate之后的日期
     */
    date: function (val = this.getCurrentTimeStamp()) {
        if(!this.isDate(val)){
            return ""
        }
        let d = new Date(val);
        let m = d.getMonth() + 1;
        m = m >= 10 ? m : "0" + m;
        let day = d.getDate();
        day = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
        return d.getFullYear() + "-" + m + "-" + day;
    },
    /**
     * @description 获取yy-mm-dd HH:MM:SS,需要传入能被new Date()解析的时间
     * @param {Date} val 默认为当前
     * @returns {String} formate之后的日期
     */
    dateTime: function (val = this.getCurrentTimeStamp()) {
        return this.date(val) + " " + this.time(val);
    },
    /**
     * @description 获取yy-mm-dd HH:MM:SS,需要传入能被new Date()解析的时间
     * @param {Date} val 默认为当前
     * @returns {String} formate之后的日期
     */
    time: function (val = this.getCurrentTimeStamp()) {
        if(!this.isDate(val)){
            return ""
        }
        let d = new Date(val);
        let h = d.getHours() >= 10 ? d.getHours() : "0" + d.getHours();
        let m = d.getMinutes() >= 10 ? d.getMinutes() : "0" + d.getMinutes();
        let s = d.getSeconds() >= 10 ? d.getSeconds() : "0" + d.getSeconds();
        return h + ":" + m + ":" + s;
    },
    /**
     * @description 获取当前月份第一天
     * @returns {String} formate之后的日期
     */
    getCurrentMonthFirst(time = this.getCurrentTimeStamp()) {
        if(!this.isDate(time)){
            return false;
        }
        let date = new Date(time);
        date.setDate(1);
        return this.date(date);
    },
    /**
     * @description 获取指定时间所在月份最后一天，默认为当前月
     * @returns {String} formate之后的日期
     */
    getCurrentMonthLast(time = this.getCurrentTimeStamp()) {
        if(!this.isDate(time)){
            return false;
        }
        let date = new Date(time);
        let currentMonth = date.getMonth();
        // 下个月
        let nextMonth = ++currentMonth;
        // 下个的第一天
        let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        let oneDay = 1000 * 60 * 60 * 24;
        return this.date(new Date(nextMonthFirstDay - oneDay))
    },
    /**
     * @description 比较两个时间的大小（需要传入可以被newDate的时间）
     * @param {Date} start 比较的第一个时间
     * @param {Date} end 比较的第二个时间
     * @returns {Boolean} 
     */
    compare(start, end) {
        if (!this.isDate(start) || !this.isDate(end)) {
            return false;
        } else {
            return  (new Date(start).getTime() - new Date(end).getTime()) > 0 ? true:false
        }
    },
    /**
     * @description 计算 “时间1” 比 “时间2”，间隔的时长；如 1年前/后，3个月前/后，20天前/后，5分钟前/后，2秒前/后
     * @params {date1} Date
     * @params {date2} Date 默认是当前时间
     */
    duration(date1, date2 = this.getCurrentTimeStamp()) {
        if(!this.isDate(date1) || !this.isDate(date2)){
            return "0"
        }
        try{
            date1 = date1.getTime();
        }catch(e){
            date1 = date1;
        }
        try{
            date2 = date2.getTime();
        }catch(e){
            date2 = date2;
        }
        let days = 1000 * 60 * 60 * 24;
        let res = '';
        let text = '前';
        let diff = date2 - date1;
        if (diff < 0) {
            diff = -1 * diff;
            text = '后';
        }

        if (diff >= days * 365) {
            res = Math.floor(diff / (days * 365)) + '年';
        }
        else if (diff >= days * 30) {
            res = Math.floor(diff / (days * 30)) + '个月';
        }
        else if (diff >= days) {
            res = Math.floor(diff / days) + '天';
        }
        else if (diff >= days / 24) {
            res = Math.floor(diff / (days / 24)) + '小时';
        }
        else if (diff >= 1000 * 60) {
            res = Math.floor(diff / (1000 * 60)) + '分钟';
        } else {
            res = Math.floor(diff / 1000) + '秒';
        }
        return `${res}${text}`;
    },
    /**
     * @description 对一个日期对象，加上某个单位的数量；
     * @param {Date} d 原始时间，默认为当前
     * @param {Int} count 加多少天（减可以用负数）默认是0
     * @example add(new Date(), 1)
     */
    count(date,count = 0) {
        let dd = null;
        if(d && this.isDate(date)){
            dd = new Date(date)
        }else{
            dd = new Date();
        }
　　　　dd.setDate(dd.getDate()+count);//获取AddDayCount天后的日期  
　　　　let y = dd.getFullYear();   
　　　　let m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0  
　　　　let d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0  
　　　　return y+"-"+m+"-"+d;   
    },
    /**
     * @description 获取一个日期所在的月份有多少天
     * @param {Date} date 时间
     * @returns 28-31
     */
    getMouthDay (date = this.getCurrentTimeStamp()) {
        let dd = new Date(date)
        let year = dd.getFullYear()
        let mouth = dd.getMonth() + 1
        let days

        //当月份为二月时，根据闰年还是非闰年判断天数
        if (mouth == 2) {
            days = year % 4 == 0 ? 29 : 28
        } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
            //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
            days = 31
        } else {
            //其他月份，天数为：30.
            days = 30
        }
        return days
    },
    /**
     * @description 获取一个日期所在的月份有几周
     * @param {Date} date 时间
     * @returns {Number} 4-6
     */
    getMonthWeek (date = this.getCurrentTimeStamp()) {
        if(!this.isDate(date))return;
        let endDay = new Date(this.getCurrentMonthLast(date));
        let year = endDay.getYear();
        let month = endDay.getMonth()+1;
        let day = endDay.getDate();
        let dd = new Date(year,month-1,day);
        let w = dd.getDay();
        let d = dd.getDate();   
        return Math.ceil((d + 6 - w) / 7);   
    }
}