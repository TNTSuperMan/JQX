export default function (element: Element | null){
    if(element){
        return {
            on(name: keyof ElementEventMap,
                callback: ( this: Element, ev: Event ) => any){
                element.addEventListener(name, callback)
            },
            off(name: keyof ElementEventMap,
                callback: ( this: Element, ev:Event ) => any){
                element.removeEventListener(name, callback)
            }
        }
    }else{
        return null
    }
}