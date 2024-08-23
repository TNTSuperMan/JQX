import { jqx } from "./jqx"
import { proxy } from "./proxy"
Object.defineProperty(window,"$",{get:()=>(arg: any)=>{
    if(typeof arg == "string"){
        return jqx(document.querySelector(arg))
    }else if(arg instanceof Element){
        return jqx(arg)
    }else if(typeof arg == "object"){
        return proxy(arg)
    }
}})