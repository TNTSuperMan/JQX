import { React } from "./proxy"
export let ReactSym = Symbol()
const ID_TEXT  = 0;
const ID_ID    = 1;
const ID_CLASS = 2;
const ID_STYLE = 3;
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
                            Reflect.set(target,prop,e,receiver),
                            element, ID_STYLE)
                    }
                    return set
                }
            })
        },(()=>{
            let map: PropertyDescriptorMap = {
                text:{
                    get:()=>element.textContent,
                    set:v=>React(v, e=>element.textContent=e, element, ID_TEXT)
                },
                html:{
                    get:()=>element.innerHTML,
                    set:v=>React(v, e=>element.innerHTML=e, element, ID_TEXT)
                },
                id:{
                    get:()=>element.id,
                    set:v=>React(v, e=>element.id=e, element, ID_ID)
                },
                class:{
                    get:()=>element.className,
                    set:v=>React(v, e=>element.className=e, element, ID_CLASS)
                }
            }
            map[ReactSym] = {
                get:()=>{
                    if(element instanceof HTMLInputElement){
                        return (e:Function | string):any => {
                            if(typeof e == "string"){
                                element.value = e
                            }else if(typeof e == "function"){
                                element.addEventListener("input",()=>e(element.value))
                                element.addEventListener("change",()=>e(element.value))
                            }
                        }
                    }else{
                        return undefined
                    }
                }
            }
            return map
        })())
    }else{
        return null
    }
}
