import { JQX } from "./jqx"
import { JQXProxy } from "./proxy"
import { Setting } from "./setting"
type Argument = 
    string  | 
    Element |
    object  | 
    null    |
    (()=>void)
const $ = (arg: Argument)=>{
    if(typeof arg == "string"){
        return JQX(document.querySelector(arg))
    }else if(arg instanceof Element){
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
        return Setting
    }
}
Object.defineProperty(window,"$",{get:()=>$})
Object.defineProperty(window,"JQX",{get:()=>$})
