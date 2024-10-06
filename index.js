((jqx)=>{
    if(typeof module == "object" && typeof module.exports == "object"){
        module.exports = jqx
    }else{
        Object.defineProperty(window,"$",{get:()=>jqx})
    }
})(require("./$"))
