import { JQX } from "./jqx"
import { JQXProxy } from "./proxy"
type Argument = 
    string | 
    HTMLElement |
    object | 
    null |
    (()=>void)
export default (arg: Argument)=>{
    if(typeof arg == "string"){
        return JQX(document.querySelector(arg))
    }else if(arg instanceof HTMLElement){
        return JQX(arg)
    }else if(typeof arg == "object"){
        return JQXProxy(arg)
    }else if(typeof arg == "function"){
        if(document.readyState[0] == "l"){
            return window.addEventListener("DOMContentLoaded",()=>arg())
        }else{
            return arg()
        }
    }else{
        return null
    }
}