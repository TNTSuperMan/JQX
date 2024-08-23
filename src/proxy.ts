let proxys: Object[] = []
let isRecording: boolean = false
let recordData: [number,string][] = []
let observeData: [number,string,Function][] = []

export let record = () => {
    isRecording = true
    recordData = []
}

export let setThen = (callback: Function) => {
    isRecording = false
    recordData.forEach(e=>{
        observeData.push([e[0],e[1],callback])
    })
    recordData = []
}

export let proxy = (obj: Object) => {
    let idx = proxys.length
    let proxy = new Proxy(obj,{
        get(target, prop, receiver){
            if(isRecording){
                recordData.push([idx, 
                    typeof prop == "string" ? prop : prop.description])
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