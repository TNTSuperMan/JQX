import ReactDOMVal from "./value"
type ObserveData = [number, string | Symbol, Function, ...any]

let proxys: Object[] = []
let isRecording: boolean = false
let recordData:  [number, string | Symbol][] = []
let observers: ObserveData[] = []

export let React = (value:()=>any, setter:(e:any)=>any, ...identity:any[]) => {
    observers
        .filter(e=>e.length-3 == identity.length)
        .map((eqLenE):[boolean, ObserveData]=>[
            eqLenE.toSpliced(0,3)
                .map((id,i)=>id==identity[i])
                .indexOf(false) == -1,
            eqLenE])
        .forEach(e=>e[0] ? observers.splice(observers.indexOf(e[1])) : 0)

    isRecording = true;
    recordData = []
    setter(value());
    isRecording = false
    recordData.forEach(e=>
        observers.push([e[0],e[1],
            ()=>setter(value()), ...identity]))
}

export let JQXProxy = (obj: Object) => {
    let idx = proxys.length
    let handler: ProxyHandler<Object> = {
        get(target, prop, receiver){
            if(isRecording){
                recordData.push([idx, prop])
            }
            return Reflect.get(target, prop, receiver)
        },
        set(target, prop, val, receiver){
            if(ReactDOMVal(val,
                ()=>handler.get(target,prop,receiver),
                (e:string)=>handler.set(target,prop,e,receiver))){
                return true;
            }else{
                let set = Reflect.set(target, prop, val, receiver)
                observers.filter(
                    e=>e[0] == idx && e[1] == prop)
                    .forEach(e=>e[2]())
                return set
            }
        }
    }
    let proxy = new Proxy(obj,handler)
    proxys.push(proxy)
    return proxy
}