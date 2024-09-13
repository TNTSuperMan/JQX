let proxys: Object[] = []
let isRecording: boolean = false
let recordData:  [number, string | Symbol][] = []
let observeData: [number, string | Symbol, Function][] = []

export let React = (value:()=>any, setter:(e:any)=>any)=>{
    while(observeData.some(e=>e[2] == setter))
        observeData.splice(observeData.findIndex(e=>e[2] == setter),1)
    
    isRecording = true;
    recordData = []
    setter(value());
    isRecording = false
    recordData.forEach(e=>
        observeData.push([e[0],e[1],
            ()=>setter(value())]))
}

export let JQXProxy = (obj: Object) => {
    let idx = proxys.length
    let proxy = new Proxy(obj,{
        get(target, prop, receiver){
            if(isRecording){
                recordData.push([idx, prop])
            }
            return Reflect.get(target, prop, receiver)
        },
        set(target,prop, val, receiver){
            let set = Reflect.set(target, prop, val, receiver)
            observeData.filter(
                e=>e[0] == idx && e[1] == prop)
                .forEach(e=>e[2]())
            return set
        }
    })
    proxys.push(proxy)
    return proxy
}