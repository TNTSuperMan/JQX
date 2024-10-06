import { React } from "./proxy"
export let ReactSym = Symbol()
const ID_TEXT  = 0;
const ID_ID    = 1;
const ID_CLASS = 2;
const ID_STYLE = 3;
export const JQX = (element: HTMLElement | Element | null) => {
    if(element){
        let arr = []
        for(let i = 0;i < element.children.length;i++)
            arr.push(JQX(element.children.item(i)))
        const proto:object = {
            on(name: keyof ElementEventMap,
                callback: ( this: Element, ev: Event ) => any){
                element.addEventListener(name, callback)
            },
            off(name: keyof ElementEventMap,
                callback: ( this: Element, ev:Event ) => any){
                element.removeEventListener(name, callback)
            },
            style: element instanceof HTMLElement ? new Proxy(element.style,{
                set(target, prop, value, receiver){
                    if(typeof value == "function"){
                        let set = Reflect.set(target,prop,value(),receiver)
                        if(set){
                            React(value,e=>{
                                Reflect.set(target,prop,e,receiver)
                            }, element, ID_STYLE)
                        }
                        return set
                    }else{
                        return Reflect.set(target,prop,value,receiver)
                    }
                }
            }) : undefined
        }
        let entry = Object.entries(proto)
        entry.push(...Object.entries(arr))
        return Object.defineProperties(
            Object.fromEntries(entry),(()=>{
            let map: PropertyDescriptorMap = {
                text:{
                    get:()=>element.textContent,
                    set:v=>typeof v == "function" ?
                        React(v, e=>element.textContent=e, element, ID_TEXT) :
                        element.textContent = v
                },
                html:{
                    get:()=>element.innerHTML,
                    set:v=>typeof v == "function" ?
                    React(v, e=>element.innerHTML=e, element, ID_TEXT) :
                    element.innerHTML = v
                },
                id:{
                    get:()=>element.id,
                    set:v=>typeof v == "function" ?
                    React(v, e=>element.id=e, element, ID_ID) :
                    element.id = v
                },
                class:{
                    get:()=>element.className,
                    set:v=>typeof v == "function" ?
                    React(v, e=>element.className=e, element, ID_CLASS) :
                    element.className = v
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
