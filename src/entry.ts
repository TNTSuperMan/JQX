import { JQX, Extend } from "./jqx"
import { JQXProxy } from "./proxy"
type Argument = 
    string  | 
    Element |
    object  | 
    null    |
    (()=>void)
export default (arg: Argument)=>{
    if(typeof arg == "string"){
        const elm = document.querySelector(arg);
        if(elm){
            return new JQX(elm);
        }else{
            return null;
        }
    }else if(arg instanceof Element){
        return new JQX(arg);
    }else if(typeof arg == "object"){
        return JQXProxy(arg)
    }else if(typeof arg == "function"){
        if(document.readyState[0] == "l"){
            return window.addEventListener("DOMContentLoaded",()=>arg());
        }else{
            return arg();
        }
    }else{
        return {
            Extend
        };
    }
}
