import jqx from "./jqx"
import proxy from "./proxy"
function $(arg: any){
    if(typeof arg == "string"){
        return jqx(document.querySelector(arg))
    }else if(arg instanceof Element){
        return jqx(arg)
    }else if(typeof arg == "object"){
        return proxy(arg)
    }
}
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", 
        ()=>Object.defineProperty(window,"$",{get:()=>$}))
}else{
    Object.defineProperty(window,"$",{get:()=>$})
}