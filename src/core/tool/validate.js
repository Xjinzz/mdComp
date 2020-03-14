/**
 * @descript validate方法类库
 * @author zhenzong.jin@mwcare.cn
 * @version v1.0.0
 * Created by zhenzong.jin on 2020/3/14.
 * 新增
 */
import Enum from "@tool/enum";
export default {
    validate:(type,str) => Enum.validate[type].test(str)
}