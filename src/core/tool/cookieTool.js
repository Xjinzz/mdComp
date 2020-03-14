/**
 * @descript cookie方法类库
 * @author zhenzong.jin@mwcare.cn
 * @version v1.0.0
 * Created by zhenzong.jin on 2020/3/13.
 * 新增
 */
export default {
    /**
     * @description 删除cookie
     * @param {String} name cookie的name
     */
    del(name) {
        this.set(name, "", new Date(0));
    },
    /**
     * @description 获取指定cookie的值
     * @param {String} name key
     * @returns {String} cookie值
     */
    get(name) {
        let cookie = document.cookie;
        let cookieName = encodeURIComponent(name) + "=",
            cookieStart = cookie.indexOf(cookieName),
            cookieValue = null;
        if (cookieStart > -1) {
            let cookieEnd = cookie.indexOf(';', cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = cookie.length;
            }
            cookieValue = decodeURIComponent(cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    /**
     * @description 设置cookies
     * @param {String}} name cookie的key
     * @param {String} value cookie的value
     * @param {Date} expires cookie的有效期
     */
    set(name, value, expires) {
        let cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        } else {
            cookieText += "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        }
        document.cookie = cookieText + ";path=/;domain=" + document.domain;
    },
}