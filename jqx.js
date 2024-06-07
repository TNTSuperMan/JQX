(e=>{
    let def = Object.defineProperty;
    let doc = document;
    let str = "string"
    let fromNative = elm => {
        if(!elm) return;
        let dom = {
            e:elm,
            on: (name, callback, option) => 
                elm.addEventListener(name,callback,option)??dom,
            off: (name, callback, option) =>
                elm.removeEventListener(name,callback,option)??dom,
            remove: e=>elm.remove(),
            append: e=>
                (elm.append(typeof(e) == str?(e=>{
                    let nte = doc.createElement("p");
                    nte.outerHTML = e;
                    return nte;
                })():e.e),dom),
            next: e=>fromNative(e.nextElementSibling)
        }
        let defjqx = (prop,get,set) => def(dom,prop,{get:get,set:set})
        defjqx("html",
            e=>e.innerHTML,
            html=>elm.innerHTML = html
        )
        defjqx("text",
            t=>elm.innerText,
            text=>elm.innerText = text
        )
        defjqx("val",
            t=>elm.value,
            val=>elm.value = val
        )
        defjqx("style",
            t=>elm.style,
            style=>elm.style = style
        )
        defjqx("class",
            e=>elm.classList,
            e=>elm.classList = e
        )
        defjqx("id",
            e=>elm.id,
            e=>elm.id = e
        )
        return dom
    }

    window.$ = query => {
        return typeof(query) == str?
            query[0] == "<"?(t=>{
                let e = doc.createElement("p");
                e.outerHTML = query;
                return fromNative(e)})():
                fromNative(doc.querySelector(query)):
            fromNative(query);
    }

    window.$$ = query => {
        let ret = [];
        doc.querySelectorAll(query).forEach(e=>
            ret.push(fromNative(e))
        )
        return ret;
    }
})()