//@ts-nocheck
import { ReactSym } from "./jqx"
import { React } from "./proxy"
export default (val,get,set)=>{
    if(typeof val._ == "function" && val._(ReactSym)){
        val._(ReactSym,set)
        React(get,e=>val._(ReactSym,e))
        return true
    }else{
        return false
    }
}