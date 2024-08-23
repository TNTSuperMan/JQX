import {record, setThen} from "./proxy"
export let jqx = (element: Element | null) => {
    if(element){
        return {
            on(name: keyof ElementEventMap,
                callback: ( this: Element, ev: Event ) => any){
                element.addEventListener(name, callback)
            },
            off(name: keyof ElementEventMap,
                callback: ( this: Element, ev:Event ) => any){
                element.removeEventListener(name, callback)
            },
            text(callback: () => string){
                record()
                element.textContent = callback()
                setThen(()=>element.textContent = callback())
            },
            html(callback: () => string){
                record()
                element.innerHTML = callback()
                setThen(()=>element.innerHTML = callback())
            },
            id(callback: () => string){
                record()
                element.id = callback()
                setThen(()=>element.id = callback())
            },
            class(callback: () => string){
                record()
                element.className = callback()
                setThen(()=>element.className = callback())
            }
        }
    }else{
        return null
    }
}
