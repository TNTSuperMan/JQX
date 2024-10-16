import ReactDOMVal from "./value";
export type Identity = (string | Element | number)[];
type ObserveData = {
    ProxyId: symbol,
    ProxyProp: string | symbol,
    Set: ()=>void,
    Identity: Identity
};

const proxys: object[] = [];
let isRecording: boolean = false;
let recordData:  {Id:symbol, Prop:string | symbol}[] = [];
const observers: ObserveData[] = [];

export const React = (value:()=>string, setter:(e:string)=>void, ...identity:Identity) => {
    observers.map((e,i)=>[i, 
        e.Identity.map((e,i)=>e==identity[i]).indexOf(false) == -1]
    ).forEach((e:([number,boolean]))=>
        e[1] ? observers.splice(e[0]) : 0);
    
    isRecording = true;
    recordData = [];
    setter(value());
    isRecording = false;
    recordData.forEach(e=>
        observers.push({
            ProxyId: e.Id,
            ProxyProp: e.Prop,
            Set: ()=>setter(value()),
            Identity: identity
        }));
}
export const JQXProxy = (obj: object) => {
    const id = Symbol();
    const handler: ProxyHandler<object> = {
        get(target, prop, receiver){
            if(isRecording)
                recordData.push({Id:id, Prop:prop});
            return Reflect.get(target, prop, receiver);
        },
        set(target, prop, val, receiver){
            if(ReactDOMVal(val,
                ()=>handler.get(target,prop,receiver),
                (e:string)=>handler.set(target,prop,e,receiver))){
                return true;
            }else{
                const set = Reflect.set(target, prop, val, receiver);
                observers.filter(
                    e=>e.ProxyId == id && 
                    e.ProxyProp == prop)
                    .forEach(e=>e.Set());
                return set;
            }
        }
    }
    const proxy = new Proxy(obj,handler);
    proxys.push(proxy);
    return proxy;
}