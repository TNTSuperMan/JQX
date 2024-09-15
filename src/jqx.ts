import { React } from "./proxy"
export let JQX = (element: HTMLElement | null) => {
    if(element){
        return Object.defineProperties({
            on(name: keyof ElementEventMap,
                callback: ( this: Element, ev: Event ) => any){
                element.addEventListener(name, callback)
            },
            off(name: keyof ElementEventMap,
                callback: ( this: Element, ev:Event ) => any){
                element.removeEventListener(name, callback)
            },
            style: new Proxy(element.style,{
                set(target, prop, value, receiver){
                    let set = Reflect.set(target,prop,value(),receiver)
                    if(set){
                        React(value,e=>
                            Reflect.set(target,prop,e,receiver))
                    }
                    return set
                }
            })
        },{
            text:{
                get:()=>element.textContent,
                set:v=>React(v, e=>element.textContent=e)
            },
            html:{
                get:()=>element.innerHTML,
                set:v=>React(v, e=>element.innerHTML=e)
            },
            id:{
                get:()=>element.id,
                set:v=>React(v, e=>element.id=e)
            },
            class:{
                get:()=>element.className,
                set:v=>React(v, e=>element.className=e)
            },
        })
    }else{
        return null
    }
}
