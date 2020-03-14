<template>
<div>11
    {{aaa.tt}}
    <input v-model = "aaa.tt"/>
    <button @click = "froze">冻结</button>
</div>
</template>

<script>
import {
    arrayTool,
    objectTool,
    stringTool,
    cookieTool,
    mathTool,
    dateTool,
    validateTool,
} from "@util";
import Log from '../../core/tool/log';
export default {
    name:"home",
    data(){
        return {
            aaa:{
                tt:1
            }
        }
    },
    created(){
      
        let arr = [[1,[2,[3,4]]],[1,[{a:[1,2]}]],3];
        console.log(arrayTool.deepFlat(arr));

        
    },
    methods:{
        froze(){
            let obj = {a:{a:1}};
            objectTool.deepFreeze(obj);
            console.log(obj);
            console.log(objectTool.toJsonArray(obj,null,"a"));
        }
    }
    
}
</script>
<style scoped>

</style>