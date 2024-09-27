//@ts-nocheck
import { ReactSym } from "./jqx"
import { React } from "./proxy"
export default (val,get,set)=>{
    if(typeof val[ReactSym] == "function"){
        val[ReactSym](set)
        React(get,e=>val[ReactSym](e))
        return true
    }else{
        return false
    }
}