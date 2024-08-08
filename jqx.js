let $=e=>{
    let doc = document,
        gen=t=>{
            let base = t
            let f = t[0]
            base.remove=e=>f.remove()
            base.on=(e,z,o)=>f.addEventListener(e,z,o)
            base.off=(e,z,o)=>f.removeEventListener(e,z,o)
            base.append=c=>f.appendChild(c)
            base.addClass=e=>f.classList.add(e)
            base.removeClass=e=>f.classList.remove(e)
            base.show=e=>f.style.display=""
            base.hide=e=>f.style.display="none"
            let def = (e,get,set) => Object.defineProperty(base,e,{get:z=>get,set:set})
            def("text",f.textContent,e=>f.textContent=e)
            def("html",f.innerHTML,e=>f.innerHTML=e)
            def("val",f.value,e=>f.value=e)
            def("style",f.style,e=>f.style=e)
            return base
        }
    if(e.call){
        if(doc.querySelector("body")){
            e()
        }else{
            doc.addEventListener("DOMContentLoaded",e)
        }
    }else{
        if(/<.+>.*/.test(e)){

        }else if(e.trim){
            return gen(doc.querySelectorAll(e))
        }else{
            return gen(e)
        }
    }
}