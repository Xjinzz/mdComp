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
} from "mwutil";
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
        let a = [1,3,2]
        console.log(arrayTool.sort(a));
        console.log(a)
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