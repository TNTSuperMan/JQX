import { JQX } from "./jqx"
import { JQXProxy } from "./proxy"
Object.defineProperty(window,"$",{get:()=>(arg: any)=>{
    if(typeof arg == "string"){
        return JQX(document.querySelector(arg))
    }else if(arg instanceof HTMLElement){
        return JQX(arg)
    }else if(typeof arg == "object"){
        return JQXProxy(arg)
    }else if(typeof arg == "function"){
        if(document.readyState == "loading"){
            return window.addEventListener("DOMContentLoaded",arg)
        }else{
            return arg()
        }
    }else{
        return null
    }
}})