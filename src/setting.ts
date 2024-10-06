type ExtendPropType = 
    (element:Element,
    react:(
        value:(()=>string),
        setter:((e:string)=>void)) => void) => {
    get:()=>string,set:(e:string)=>void
}
type ExtendFuncType = 
    (element:Element, 
    react:(
        value:(()=>string),
        setter:((e:string)=>void)) => void) => (()=>void)
export const extendProps:[ExtendPropType,string][] = []
export const extendFuncs:[ExtendFuncType,string][] = []
export const Setting = {
    extendProp(name:string, create:ExtendPropType){
        extendProps.push([create,name])
    },
    extendFunc(name:string, callback:ExtendFuncType){
        extendFuncs.push([callback,name])
    },
    ver:"JQXv7095110"
}