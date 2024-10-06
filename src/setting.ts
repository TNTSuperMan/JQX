export const extendFuncs:[Function,string][] = []
export const extendProps:[Function,string][] = []
export const Setting = {
    extendProp(name:string, create:Function){
        extendProps.push([create,name])
    },
    extendFunc(name:string, callback:Function){
        extendFuncs.push([callback,name])
    },
    ver:"JQXv7095110"
}