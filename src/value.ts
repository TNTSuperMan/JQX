import { JQXBase } from "./jqx"
import { React } from "./proxy"
export default ( val: JQXBase | null, get:()=>string, set:(e:string)=>void)=>{
    if(val instanceof JQXBase){
        const elm = val.element;
        if(elm instanceof HTMLInputElement){
            elm.addEventListener("input",()=>set(elm.value));
            elm.addEventListener("change",()=>set(elm.value));
            React(get, e=>elm.value=e, elm, 4);
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}